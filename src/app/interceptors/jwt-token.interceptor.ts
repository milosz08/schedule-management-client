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
import { HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';

import { catchError, Observable, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppGlobalState } from '../ngrx-store/combine-reducers';
import { RefreshTokenResposneModel } from '../ngrx-store/session-ngrx-store/ngrx-models/refresh-token.model';
import { AuthResponseDataModel } from '../ngrx-store/session-ngrx-store/ngrx-models/auth-response-data.model';

import {
    serverConnectionFailure, userLogout, userSuccesedSetNewToken
} from '../ngrx-store/session-ngrx-store/session.actions';

import { AuthService } from '../services/auth.service';
import { BrowserStorageService } from '../services/browser-storage.service';

/**
 * Interceptor dodający do nagłówka każdego zapytania token JWT pobierany z local storage
 * (jeśli takowy się tam znajduje). Dodatkowo dodaje nagłówek Content-Type w postaci typu "application/json".
 * Klasa dodatkowo odpowiada za odświeżanie tokenu JWT.
 */

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

    public constructor(
        private _authService: AuthService,
        private _store: Store<AppGlobalState>,
        private _storage: BrowserStorageService,
    ) {
    };

    /**
     * Metoda pomocnicza dodająca token do wszystkich wysyłanych nagłówków.
     */
    private static addTokenHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    };

    /**
     * Metoda uruchamia przy każdym zapytaniu do API. Dodatkowo przechwytuje błędy HTTP 401 (błąd autoryzacji)
     * sprawdzając ważność JWT (jeśli jest nieważny podczas wykonywania zapytanania, wygeneruje nowy).
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        const person: AuthResponseDataModel | null = this._storage.getUserFromStorage();
        if (person) {
            req = JwtTokenInterceptor.addTokenHeader(req, person.bearerToken);
        }
        return next.handle(req).pipe(
            catchError(err => {
                if (err.status === HttpStatusCode.Unauthorized) {
                    return this.refreshTokenInvoker(req, next);
                }
                return of(serverConnectionFailure());
            }),
        );
    };

    /**
     * Metoda uruchamiająca potok odpowiedzialny za wygenerowanie nowego tokenu (na podstawie
     * metody HTTP z serwisu auth). Jeśli pojawi się jakiś błąd metoda natychniastowo wylogowywuje użytkownika.
     */
    private refreshTokenInvoker(req: HttpRequest<any>, next: HttpHandler) {
        const person: AuthResponseDataModel | null = this._storage.getUserFromStorage();
        if (person) {
            return this._authService
                .getNewJwtToken(person!.bearerToken, person!.refreshBearerToken)
                .pipe(
                    switchMap((newTokens: RefreshTokenResposneModel) => {
                        this._storage.setRefreshedJwtTokenInLocalStorage(newTokens);
                        this._store.dispatch(userSuccesedSetNewToken({ newTokens }));
                        return next.handle(JwtTokenInterceptor.addTokenHeader(req, newTokens.bearerToken));
                    }),
                    catchError(() => {
                        return of(userLogout());
                    }),
                );
        }
        return of(userLogout());
    };
}