/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: reset-password.effects.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 16:05
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

import { catchError, map, mergeMap, of, tap } from 'rxjs';

import * as NgrxAction_RES from '../reset-password.actions';
import { ResetPasswordReducerType } from '../reset-password.selectors';
import * as NgrxAction_SHA from '../../../../shared-module/ngrx-store/shared-ngrx-store/shared.actions';

import { ResetPasswordService } from '../../../services/reset-password.service';

//-----------------------------------------------------------------------------------

/**
 * Klasa efektów odpowiedzialna za resetowanie hasła.
 */

@Injectable()
export class ResetPasswordEffects {

    public constructor(
        private _router: Router,
        private _action$: Actions,
        private _resetPasswordService: ResetPasswordService,
        private _store: Store<ResetPasswordReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę wysłania do użytkownika tokenu resetującego hasło na adres email.
     */
    public sendResetPasswordTokenViaEmail$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_RES.__sendResetPasswordToken),
            mergeMap(action => {
                return this._resetPasswordService
                    .userSendResetPasswordTokenViaEmail(action.email)
                    .pipe(
                        map(res => {
                            this._store.dispatch(NgrxAction_SHA.__setSuspenseLoaderDelay({ status: false }));
                            return NgrxAction_RES.__successSendResedPasswordToken({ message: res.message });
                        }),
                        catchError(({ error }) => {
                            this._store.dispatch(NgrxAction_SHA.__setSuspenseLoaderDelay({ status: false }));
                            if (error.message) {
                                return of(NgrxAction_RES.__failureSendResetPasswordToken({ errorMessage: error.message }));
                            }
                            return of(NgrxAction_RES.__failureSendResetPasswordToken({
                                errorMessage: 'Błąd połączenia z serwerem. Spróbuj ponownie później'
                            }));
                        }),
                    );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający potok inicjalizujący wysłanie do serwera tokenu resetowania hasła wprowadzonego przez
     * użytkownika. Jeśli token jest nieprawidłowy, wyłapuje wyjątek.
     */
    public validateResetPasswordToken$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_RES.__resetPasswordValidateToken),
            mergeMap(action => {
                return this._resetPasswordService
                    .userResetPasswordValidateToken(action.token)
                    .pipe(
                        map(res => {
                            this._store.dispatch(NgrxAction_SHA.__setSuspenseLoaderDelay({ status: false }));
                            return NgrxAction_RES.__resetPasswordSuccessValidateToken({ payload: res });
                        }),
                        catchError(({ error }) => {
                            this._store.dispatch(NgrxAction_SHA.__setSuspenseLoaderDelay({ status: false }));
                            if (error) {
                                return of(NgrxAction_RES.__resetPasswordFailureValidateToken({
                                    errorMessage: error.message
                                }));
                            }
                            return of(NgrxAction_RES.__failureSendResetPasswordToken({
                                errorMessage: 'Błąd połączenia z serwerem. Spróbuj ponownie później'
                            }));
                        }),
                    );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę wysłania nowego hasła do serwera, sprawdzenia ważności tokena JWT i odesłanie
     * komunikatu do użytkownika (błąd lub powodzenie operacji).
     */
    public resetPasswordViaEmailToken$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_RES.__resetPasswordSendNewPassword),
            mergeMap(action => {
                return this._resetPasswordService
                    .userResetPasswordViaEmailToken(action.passwordsPayload)
                    .pipe(
                        map(res => {
                            this._store.dispatch(NgrxAction_SHA.__setSuspenseLoaderDelay({ status: false }));
                            return NgrxAction_RES.__resetPasswordSucessSetNewPassword({ message: res.message });
                        }),
                        catchError(({ error }) => {
                            this._store.dispatch(NgrxAction_SHA.__setSuspenseLoaderDelay({ status: false }));
                            if (error) {
                                return of(NgrxAction_RES.__resetPasswordFailureSetNewPassword({
                                    errorMessage: error.message
                                }));
                            }
                            return of(NgrxAction_RES.__resetPasswordFailureSetNewPassword({
                                errorMessage: 'Nieznany błąd podczas próby zmiany hasła. Spróbuj ponownie później.'
                            }));
                        }),
                    );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę przejścia na stronę zmiany hasła po poprawnej walidacji tokenu. Dołącza do
     * ścieżki również parametr zapytania z JWT, niezbędnym do wysłania nowego hasła na serwer.
     */
    public redirectToResetPasswordPage$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_RES.__resetPasswordSuccessValidateToken),
            tap(action => {
                this._router.navigate(
                    [ '/auth/reset-password' ],
                    { queryParams: { token: action.payload.bearerToken } }
                ).then(r => r);
            }),
        );
    }, { dispatch: false });
}