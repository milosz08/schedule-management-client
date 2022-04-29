/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: login-session.effects.ts
 * Last modified | Ostatnia modyfikacja: 24/04/2022, 18:06
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
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';

import { SESSION_REDUCER } from '../session.selectors';
import { AppGlobalState } from '../../combine-reducers';
import { setSuspenseLoader } from '../../shared-ngrx-store/shared.actions';
import { RefreshTokenResposneModel } from '../ngrx-models/refresh-token.model';

import {
    SESSION_LOGOUT, SESSION_SUCCESS_LOGIN,
    serverConnectionFailure, userAutoLogin, userFailuredGetImage, userFailureLogin, userFailureSetNewToken,
    userGetImage, userLogin, userLogout, userSetNewToken, userSuccesedGetImage, userSuccesedSetNewToken,
    userSuccessLogin, userRenewSession, userSessionSetModalVisibility, userLogoutModalSetVisibility,
} from '../session.actions';

import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';
import { BrowserStorageService } from '../../../services/browser-storage.service';

/**
 * Klasa efektów (middleware) dla ngrx stora obsługującego stan sesji i autentykację użytkowników.
 */

@Injectable()
export class LoginSessionEffects {

    constructor(
        private _actions$: Actions,
        private _authService: AuthService,
        private _sessionService: SessionService,
        private _storageService: BrowserStorageService,
        private _store: Store<AppGlobalState>,
        private _storage: BrowserStorageService,
        private _router: Router,
    ) {
    };

    /**
     * Efekt uruchamiający procedurę logowania (w przypadku błędów, błędy z API są przechwytywane do stora
     * i wyświetlane użytkownikowi w formularzu).
     */
    public userLogin$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(userLogin),
            mergeMap(action => {
                return this._authService
                    .userLogin(action.login, action.password)
                    .pipe(
                        map(data => {
                            if (data.hasPicture) {
                                this._store.dispatch(userGetImage({ userId: data.dictionaryHash, jwt: data.bearerToken }));
                            } else {
                                setTimeout(() => this._store.dispatch(setSuspenseLoader({ status: false })), 1000);
                            }
                            this._storageService.setUserInStorage(data);
                            this._sessionService.allSessionCountersRerun(data);
                            return userSuccessLogin({ data, ifRedirectToRoot: true });
                        }),
                        catchError(error => {
                            setTimeout(() => this._store.dispatch(setSuspenseLoader({ status: false })), 1000);
                            this._sessionService.sessionEndInterval();
                            // nieoczekiwany błąd serwera (brak połączenia z backendem)
                            if (error.statusText.toLowerCase().includes('error') || error.status === 0) {
                                return of(serverConnectionFailure());
                            }
                            return of(userFailureLogin({ errorMessage: error.error.message }));
                        }),
                    );
            }),
        );
    });

    /**
     * Efekt uruchamiający serwis ładujący obrazek użytkownika do stora.
     */
    public userGetImage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(userGetImage),
            mergeMap(action => {
                return this._authService
                    .userGetImage(action.userId, action.jwt)
                    .pipe(
                        map(data => {
                            const imageUri = this._storageService.setUserImageInStorage(data)
                            setTimeout(() => this._store.dispatch(setSuspenseLoader({ status: false })), 1000);
                            return userSuccesedGetImage({ imageUri });
                        }),
                        catchError(() => {
                            return of(userFailuredGetImage());
                        }),
                    );
            }),
        );
    });

    /**
     * Efekt uruchamiający procedurę automatycznego logowania (przy uruchomieniu strony)
     * pobierając dane z magazynu local storage przy pomocy serwisu BrowserStorageService
     */
    public userAutoLogin$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(userAutoLogin),
            map(() => {
                const data = this._storageService.getUserFromStorage();
                if (data) {
                    const imageUri = this._storageService.getUserImageFromStorage();
                    this._store.dispatch(userSuccesedGetImage({ imageUri }));
                    this._store.dispatch(userSetNewToken({ data }));
                    this._sessionService.allSessionCountersRerun(data);
                    return userSuccessLogin({ data, ifRedirectToRoot: false });
                }
                return userLogout();
            }),
        );
    });

    /**
     * Efekt uruchamiający procedurę ustawiania nowego tokenu JWT na podstawie tokenu odświeżającego.
     */
    public setNewJwt$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(userSetNewToken),
            mergeMap(action => {
                if (action.data) {
                    return this._authService
                        .getNewJwtToken(action.data.bearerToken, action.data.refreshBearerToken)
                        .pipe(
                            map((newTokens: RefreshTokenResposneModel) => {
                                this._storage.setRefreshedJwtTokenInLocalStorage(newTokens);
                                return userSuccesedSetNewToken({ newTokens });
                            }),
                        );
                }
                return of(userFailureSetNewToken());
            }),
        );
    });

    /**
     * Efekt uruchamiający procedurę wylogowywania (dodatkowo resetuje timer sesji i usuwa zapisanego
     * użytkownika z local storage). Dodatkowo po wylogowywaniu przenosi na stronę startową i pokazuje
     * modal z informacją o wylogowywaniu użytkownika.
     */
    public userLogout$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(userLogout),
            map(() => {
                this._sessionService.sessionEndInterval();
                this._storageService.removeUserWithImageFromStorage();
            }),
        );
    }, { dispatch: false });

    /**
     * Efekt uruchamiający procedurę przejścia na stronę startową przy wywołaniu akcji poprawnego zalogowania
     * lub wylogowania z systemu.
     */
    public loginLogoutRedirect$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(userSuccessLogin, userLogout),
            tap(action => {
                const ifRedirect = action.type === SESSION_SUCCESS_LOGIN && action.ifRedirectToRoot;
                if (ifRedirect || action.type === SESSION_LOGOUT) {
                    this._router.navigate([ '/' ]).then(r => r);
                }
            }),
        );
    }, { dispatch: false });

    /**
     *
     */
    public sessionRenew$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(userRenewSession),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            map(([ action, state ]) => {
                this._store.dispatch(userSessionSetModalVisibility({ modalVisibility: false }));
                this._store.dispatch(userSetNewToken({ data: state.userData }));
                this._sessionService.allSessionCountersRerun(state.userData!);
            }),
        );
    }, { dispatch: false });
}