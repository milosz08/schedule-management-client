/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: jwt-session.effects.ts
 * Last modified | Ostatnia modyfikacja: 30/04/2022, 13:50
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

import { map, mergeMap, of, withLatestFrom } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ReducerAction from '../session.actions';
import { SESSION_REDUCER } from '../session.selectors';
import { AppGlobalState } from '../../combine-reducers';
import { RefreshTokenResposneModel } from '../ngrx-models/refresh-token.model';

import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';
import { BrowserStorageService } from '../../../services/browser-storage.service';

/**
 * Klasa efektów odpowiedzialnych za zarządzanie tokenem JWT oraz sesją użytkownika (odświeżanie tokenu oraz sesji).
 */

@Injectable()
export class JwtSessionEffects {

    public constructor(
        private _actions$: Actions,
        private _authService: AuthService,
        private _store: Store<AppGlobalState>,
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
            ofType(ReducerAction.userSetNewToken),
            mergeMap(action => {
                if (action.data) {
                    return this._authService
                        .getNewJwtToken(action.data.bearerToken, action.data.refreshBearerToken)
                        .pipe(
                            map((newTokens: RefreshTokenResposneModel) => {
                                this._storageService.setRefreshedJwtTokenInLocalStorage(newTokens);
                                return ReducerAction.userSuccesedSetNewToken({ newTokens });
                            }),
                        );
                }
                return of(ReducerAction.userFailureSetNewToken());
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     *
     */
    public sessionRenew$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.userRenewSession),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            map(([ action, state ]) => {
                this._store.dispatch(ReducerAction.userSessionSetModalVisibility({ modalVisibility: false }));
                this._store.dispatch(ReducerAction.userSetNewToken({ data: state.userData }));
                this._sessionService.allSessionCountersRerun(state.userData!);
            }),
        );
    }, { dispatch: false });
}