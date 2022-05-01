/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: saved-users.effects.ts
 * Last modified | Ostatnia modyfikacja: 30/04/2022, 16:26
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

import { map, withLatestFrom } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ReducerAction from '../session.actions';
import { SESSION_REDUCER } from '../session.selectors';
import { AppGlobalState } from '../../combine-reducers';

import { RememberUserStorageService } from '../../../services/remember-user-storage.service';

/**
 * Klasa efektów odpowiedzialna za obsługę zapisu/odczytu zapamiętanych ostatnio zalogowanych użytkowników.
 */

@Injectable()
export class SavedUsersEffects {

    public static readonly SAVED_MAX_USERS: number = 7;

    constructor(
        private _actions$: Actions,
        private _store: Store<AppGlobalState>,
        private _rememberUserStorageService: RememberUserStorageService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Zapisaywanie użytkownika przy logowaniu do magazuny local storage (tylko jeśli checkbox jest na true).
     */
    public saveLastUserInStorage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.userSuccessLogin),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            map(([ action, state ]) => {
                const { ifSaveUserInLastLogin, userData, allSavedAccounts } = state;
                const ifSaveUser = ifSaveUserInLastLogin && userData && action.ifRedirectToRoot;
                if (ifSaveUser && allSavedAccounts.length < SavedUsersEffects.SAVED_MAX_USERS) {
                    const userAccount = this._rememberUserStorageService.saveUserDataInLocalStorage(userData);
                    return ReducerAction.saveSingleAccount({ userAccount });
                }
                return ReducerAction.saveSingleAccount({ userAccount: null });
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Ładowanie do aplikacji wszystkich zapisanych użytkowników z magazynu local storage oraz ngrx stora.
     */
    public loadAllUsersAccounts$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.loadAllAccounts),
            map(() => {
                const usersAccounts = this._rememberUserStorageService.loadAllSavedAccounts();
                return ReducerAction.saveAllAccounts({ usersAccounts });
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Usuwanie wszystkich zapisanych użytkowników z magazynu local storage oraz ngrx stora aplikacji.
     */
    public removeAllSavedUsers$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.removeAllSavedAccounts),
            map(() => {
                this._rememberUserStorageService.removeAllSaveUsersFromLocalStorage();
                return ReducerAction.succesedRemoveAllSavedAccounts();
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Usuwanie pojedynczego użytkownika z local storage i ngrx stora na podstawie wartości hash ID.
     */
    public removeSingleSavedUser$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.removeSingleSavedAccount),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            map(([ action, state ]) => {
                this._rememberUserStorageService.removeSaveUserFromLocalStorageBaseId(action.userId);
                const accountsArrayAfterRemove = state.allSavedAccounts
                    .filter(account => account.dictionaryHash !== action.userId);
                return ReducerAction.succesedRemoveSingleSavedAccount({ accountsArrayAfterRemove });
            }),
        );
    });
}