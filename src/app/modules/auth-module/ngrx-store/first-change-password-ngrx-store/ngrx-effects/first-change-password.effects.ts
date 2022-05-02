/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: first-change-password.effects.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 16:35
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

import * as NgrxAction from '../first-change-password.actions';
import * as NgrxAction_SHA from '../../../../shared-module/ngrx-store/shared-ngrx-store/shared.actions';
import * as NgrxAction_SES from '../../../../shared-module/ngrx-store/session-ngrx-store/session.actions';

import { SESSION_REDUCER, SessionReducerType } from '../../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';

import { AuthService } from '../../../../shared-module/services/auth.service';
import { FirstChangePasswordService } from '../../../services/first-change-password.service';
import { FirstChangePasswordStorageService } from '../../../services/first-change-password-storage.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa efektów odpowiedzialna za obsługę zmiany początkowego hasła wygenerowanego przez system.
 */

@Injectable()
export class FirstChangePasswordEffects {

    public constructor(
        private _router: Router,
        private _actions$: Actions,
        private _authService: AuthService,
        private _store: Store<SessionReducerType>,
        private _storageService: FirstChangePasswordStorageService,
        private _firstChangePasswordService: FirstChangePasswordService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę przekierowania na stronę umożliwiająca zmianę domyślnego hasła. Następuje to
     * tylko wtedy, gdy użytkownik jeszcze nie zmienił hasła, bądź niezablokował tej strony ręcznie.
     */
    public userSuccesedLoginRedirectToChangePassword$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__successLogin),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            tap(([ _, state ]) => {
                if (state.userData) {
                    const ifBlockedByUser = this._storageService
                        .checkIfFirstChangePasswordIsDisabled(state.userData.dictionaryHash);
                    if (state.userData.firstAccess && !ifBlockedByUser) {
                        this._router.navigate([ '/auth/first-change-password' ]).then(r => r);
                    }
                }
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt manipulujący widocznością strony umożliwiającej zmianę początkowego hasła
     * (manipulacja poprzez wywoływanie serwisu _storageService).
     */
    public userChangePasswordPageVisibility$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction.__toggleChangePasswordPageVisible),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            tap(([ action, state ]) => {
                if (state.userData) {
                    if (action.pageVisibility) {
                        this._storageService.activeDisabledFirstChangePage(state.userData.dictionaryHash);
                    } else {
                        this._storageService.removeDisabledFirstChangePage(state.userData.dictionaryHash);
                    }
                }
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt odpowiedzialny za zmianę początkowego hasła użytkownika. Komunikuje się z API poprzez
     * serwis _authService i ustawia odpowiednio wartość messsage w ngrx storze.
     */
    public userChangeDefaultPassword$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction.__changeDefaultPassword),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            mergeMap(([ action, state ]) => {
                return this._firstChangePasswordService
                    .userChangeDefaultPassword(state.userData!.dictionaryHash, action.passwordsPayload)
                    .pipe(
                        map(({ message }) => {
                            this._store.dispatch(NgrxAction_SHA.__setSuspenseLoaderDelay({ status: false }));
                            this._storageService.activeDisabledFirstChangePage(state.userData!.dictionaryHash);
                            setTimeout(() => {
                                this._store.dispatch(NgrxAction.__resetChangeDefaultPasswordMessage());
                                this._router.navigate([ '/' ]).then(r => r);
                            }, 5000);
                            return NgrxAction.__afterChangeDefaultPassword({
                                message: `${message} Przekierowanie...`,
                            });
                        }),
                        catchError(({ error }) => {
                            this._store.dispatch(NgrxAction_SHA.__setSuspenseLoaderDelay({ status: false }));
                            return of(NgrxAction.__afterChangeDefaultPassword({ message: error.message }));
                        }),
                    );
            }),
        );
    });
}