/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: jwt-session.effects.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 17:57
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

import { map, mergeMap, of, withLatestFrom } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as NgrxAction_SES from '../session.actions';
import * as NgrxAction_MOD from '../../modals-ngrx-store/modals.actions';
import { SESSION_REDUCER, SessionReducerType } from '../session.selectors';

import { RefreshTokenResposneModel } from '../../../../../models/refresh-token.model';

import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';
import { BrowserStorageService } from '../../../services/browser-storage.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa efektów odpowiedzialnych za zarządzanie tokenem JWT oraz sesją użytkownika (odświeżanie tokenu oraz sesji).
 */

@Injectable()
export class JwtSessionEffects {

    public constructor(
        private _actions$: Actions,
        private _authService: AuthService,
        private _store: Store<SessionReducerType>,
        private _sessionService: SessionService,
        private _storageService: BrowserStorageService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę ustawiania nowego tokenu JWT na podstawie tokenu odświeżającego.
     */
    public setNewJwt$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__setNewToken),
            mergeMap(action => {
                if (action.data) {
                    return this._authService
                        .getNewJwtToken(action.data.bearerToken, action.data.refreshBearerToken)
                        .pipe(
                            map((newTokens: RefreshTokenResposneModel) => {
                                this._storageService.setRefreshedJwtTokenInLocalStorage(newTokens);
                                return NgrxAction_SES.__succesedSetNewToken({ newTokens });
                            }),
                        );
                }
                return of(NgrxAction_SES.__failureSetNewToken());
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę odnowienia sesji użytkownika.
     */
    public sessionRenew$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__renewSession),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            map(([ _, state ]) => {
                this._store.dispatch(NgrxAction_MOD.__sessionSetModalVisibility({ modalVisibility: false }));
                this._store.dispatch(NgrxAction_SES.__setNewToken({ data: state.userData }));
                this._sessionService.allSessionCountersRerun(state.userData!);
            }),
        );
    }, { dispatch: false });
}