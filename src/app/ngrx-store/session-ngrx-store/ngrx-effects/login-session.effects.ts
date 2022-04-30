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

import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ReducerAction from '../session.actions';
import { AppGlobalState } from '../../combine-reducers';
import { setSuspenseLoader } from '../../shared-ngrx-store/shared.actions';
import { SESSION_SUCCESS_LOGIN, userSetAutoFilledEmail, } from '../session.actions';

import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';
import { BrowserStorageService } from '../../../services/browser-storage.service';
import { RememberUserStorageService } from '../../../services/remember-user-storage.service';

/**
 * Klasa efektów (middleware) dla ngrx stora obsługującego autentykację użytkowników.
 */

@Injectable()
export class LoginSessionEffects {

    constructor(
        private _actions$: Actions,
        private _authService: AuthService,
        private _sessionService: SessionService,
        private _rememberUserStorageService: RememberUserStorageService,
        private _storageService: BrowserStorageService,
        private _store: Store<AppGlobalState>,
        private _router: Router,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę logowania (w przypadku błędów, błędy z API są przechwytywane do stora
     * i wyświetlane użytkownikowi w formularzu).
     */
    public userLogin$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.userLogin),
            mergeMap(action => {
                return this._authService
                    .userLogin(action.login, action.password)
                    .pipe(
                        map(data => {
                            const { dictionaryHash, bearerToken } = data;
                            if (data.hasPicture) {
                                this._store
                                    .dispatch(ReducerAction.userGetImage({ userId: dictionaryHash, jwt: bearerToken }));
                            } else {
                                setTimeout(() => this._store.dispatch(setSuspenseLoader({ status: false })), 1000);
                            }
                            this._storageService.setUserInStorage(data);
                            this._sessionService.allSessionCountersRerun(data);
                            return ReducerAction.userSuccessLogin({ data, ifRedirectToRoot: true });
                        }),
                        catchError(error => {
                            setTimeout(() => this._store.dispatch(setSuspenseLoader({ status: false })), 1000);
                            this._sessionService.sessionEndInterval();
                            // nieoczekiwany błąd serwera (brak połączenia z backendem)
                            if (error.statusText.toLowerCase().includes('error') || error.status === 0) {
                                return of(ReducerAction.serverConnectionFailure());
                            }
                            return of(ReducerAction.userFailureLogin({ errorMessage: error.error.message }));
                        }),
                    );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający serwis ładujący obrazek użytkownika do stora.
     */
    public userGetImage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.userGetImage),
            mergeMap(action => {
                return this._authService
                    .userGetImage(action.userId, action.jwt)
                    .pipe(
                        map(data => {
                            const imageUri = this._storageService.setUserImageInStorage(data)
                            setTimeout(() => this._store.dispatch(setSuspenseLoader({ status: false })), 1000);
                            return ReducerAction.userSuccesedGetImage({ imageUri });
                        }),
                        catchError(() => {
                            return of(ReducerAction.userFailuredGetImage());
                        }),
                    );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę automatycznego logowania (przy uruchomieniu strony)
     * pobierając dane z magazynu local storage przy pomocy serwisu BrowserStorageService
     */
    public userAutoLogin$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.userAutoLogin),
            map(() => {
                const data = this._storageService.getUserFromStorage();
                if (data) {
                    const imageUri = this._storageService.getUserImageFromStorage();
                    this._store.dispatch(ReducerAction.userSuccesedGetImage({ imageUri }));
                    this._store.dispatch(ReducerAction.userSetNewToken({ data }));
                    this._sessionService.allSessionCountersRerun(data);
                    return ReducerAction.userSuccessLogin({ data, ifRedirectToRoot: false });
                }
                return ReducerAction.userLogout({ ifRedirectToRoot: false });
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę wylogowywania (dodatkowo resetuje timer sesji i usuwa zapisanego
     * użytkownika z local storage). Dodatkowo po wylogowywaniu przenosi na stronę startową i pokazuje
     * modal z informacją o wylogowywaniu użytkownika.
     */
    public userLogout$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.userLogout),
            map(() => {
                this._sessionService.sessionEndInterval();
                this._storageService.removeUserWithImageFromStorage();
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę przejścia na stronę startową przy wywołaniu akcji poprawnego zalogowania
     * lub wylogowania z systemu.
     */
    public loginLogoutRedirect$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.userSuccessLogin, ReducerAction.userLogout),
            tap(action => {
                this._store.dispatch(userSetAutoFilledEmail({ emailValue: '' }));
                const ifRedirect = action.type === SESSION_SUCCESS_LOGIN || action.ifRedirectToRoot;
                if (ifRedirect) {
                    this._router.navigate([ '/' ]).then(r => r);
                }
            }),
        );
    }, { dispatch: false });
}