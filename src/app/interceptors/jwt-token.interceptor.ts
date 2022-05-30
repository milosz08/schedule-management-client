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
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthResponseDataModel } from '../models/auth-response-data.model';

import { AuthService } from '../modules/shared-module/services/auth.service';
import { BrowserStorageService } from '../modules/shared-module/services/browser-storage.service';

/**
 * Interceptor dodający do nagłówka każdego zapytania token JWT pobierany z local storage
 * (jeśli takowy się tam znajduje). Dodatkowo dodaje nagłówek Content-Type w postaci typu "application/json".
 * Klasa dodatkowo odpowiada za odświeżanie tokenu JWT.
 */

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

    public constructor(
        private _authService: AuthService,
        private _storage: BrowserStorageService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pomocnicza dodająca token do wszystkich wysyłanych nagłówków.
     */
    private static addTokenHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda uruchamia przy każdym zapytaniu do API. Dodatkowo przechwytuje błędy HTTP 401 (błąd autoryzacji)
     * sprawdzając ważność JWT (jeśli jest nieważny podczas wykonywania zapytanania, wygeneruje nowy).
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json; charset=utf-8') });
        const person: AuthResponseDataModel | null = this._storage.getUserFromStorage();
        if (person) {
            req = JwtTokenInterceptor.addTokenHeader(req, person.bearerToken);
        }
        return next.handle(req);
    };
}