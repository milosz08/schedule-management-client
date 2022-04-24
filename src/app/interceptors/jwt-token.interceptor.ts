/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: jwt-token.interceptor.ts
 * Last modified | Ostatnia modyfikacja: 24/04/2022, 13:51
 * Project name | Nazwa Projektu: angular-po-schedule-management-client
 *
 * Klient | Client: <https://github.com/Milosz08/Angular_PO_Schedule_Management_Client>
 * Serwer | Server: <https://github.com/Milosz08/ASP.NET_PO_Schedule_Management_Server>
 *
 * Client for the ASP.NET Core application to manage schedule for sample university. Written with the Angular Framework
 * for generating dynamic web applications. Project for the teaching course "Objected Oriented Programming".
 *
 * Klient dla aplikacji ASP.NET Core służącej do zarządzania planem zajęć uczelni. Napisany przy użyciu frameworka
 * Angular do generowania dynamicznych aplikacji webowych. Projekt wykonany na zajęcia "Programowanie
 * Obiektowe".
 */

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BrowserStorageService } from '../services/browser-storage.service';
import { AuthResponseDataModel } from '../ngrx-store/session-ngrx-store/ngrx-models/auth-response-data.model';

/**
 * Interceptor dodający do nagłówka każdego zapytania token JWT pobierany z local storage
 * (jeśli takowy się tam znajduje). Dodatkowo dodaje nagłówek Content-Type w postaci typu "application/json".
 */

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

    public constructor(
        private _browserStorageService: BrowserStorageService,
    ) {
    };

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        const person: AuthResponseDataModel | null = this._browserStorageService.getUserFromStorage();
        if (person) {
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${person.bearerToken}`) })
        }
        return next.handle(req);
    };
}