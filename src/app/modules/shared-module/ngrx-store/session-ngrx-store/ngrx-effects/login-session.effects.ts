/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: login-session.effects.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 17:56
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
import { Store } from '@ngrx/store';

import { catchError, map, mergeMap, of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as NgrxAction_SES from '../session.actions';
import * as NgrxAction_SHA from '../../shared-ngrx-store/shared.actions';

import { SessionReducerType } from '../session.selectors';

import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';
import { BrowserStorageService } from '../../../services/browser-storage.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa efektów (middleware) dla ngrx stora obsługującego autentykację użytkowników.
 */

@Injectable()
export class LoginSessionEffects {

    public constructor(
        private _actions$: Actions,
        private _authService: AuthService,
        private _sessionService: SessionService,
        private _store: Store<SessionReducerType>,
        private _storageService: BrowserStorageService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę logowania (w przypadku błędów, błędy z API są przechwytywane do stora
     * i wyświetlane użytkownikowi w formularzu).
     */
    public userLogin$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__login),
            mergeMap(action => {
                return this._authService
                    .userLogin(action.login, action.password)
                    .pipe(
                        map(data => {
                            const { dictionaryHash, bearerToken } = data;
                            if (data.hasPicture) {
                                this._store
                                    .dispatch(NgrxAction_SES.__getImage({ userId: dictionaryHash, jwt: bearerToken }));
                            } else {
                                this._store.dispatch(NgrxAction_SHA.__setSuspenseLoaderDelay({ status: false }));
                            }
                            this._storageService.setUserInStorage(data);
                            this._sessionService.allSessionCountersRerun(data);
                            return NgrxAction_SES.__successLogin({ data, ifRedirectToRoot: true });
                        }),
                        catchError(({ error }) => {
                            this._store.dispatch(NgrxAction_SHA.__setSuspenseLoaderDelay({ status: false }));
                            this._sessionService.sessionEndInterval();
                            if (error.message) {
                                return of(NgrxAction_SES.__failureLogin({ errorMessage: error.message }));
                            }
                            return of(NgrxAction_SES.__failureLogin({
                                errorMessage: 'Brak połączenia z serwerem. Spróbuj ponownie później.'
                            }));
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
            ofType(NgrxAction_SES.__getImage),
            mergeMap(action => {
                return this._authService
                    .userGetImage(action.userId, action.jwt)
                    .pipe(
                        map(data => {
                            const imageUri = this._storageService.setUserImageInStorage(data)
                            this._store.dispatch(NgrxAction_SHA.__setSuspenseLoaderDelay({ status: false }));
                            return NgrxAction_SES.__succesedGetImage({ imageUri });
                        }),
                        catchError(() => {
                            return of(NgrxAction_SES.__failuredGetImage());
                        }),
                    );
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
            ofType(NgrxAction_SES.__logout),
            map(() => {
                this._sessionService.sessionEndInterval();
                this._storageService.removeUserWithImageFromStorage();
            }),
        );
    }, { dispatch: false });
}