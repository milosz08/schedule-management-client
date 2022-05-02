/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: saved-users.effects.ts
 * Last modified | Ostatnia modyfikacja: 01/05/2022, 19:01
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

import { map, withLatestFrom } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as NgrxAction_REM from '../remember-user.actions';
import * as NgrxAction_SES from '../../../../shared-module/ngrx-store/session-ngrx-store/session.actions';
import { REMEMBER_USER_REDUCER, RememberUserReducerType } from '../remember-user.selectors';

import { RememberUserStorageService } from '../../../services/remember-user-storage.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa efektów odpowiedzialna za obsługę zapisu/odczytu zapamiętanych ostatnio zalogowanych użytkowników.
 */

@Injectable()
export class SavedUsersEffects {

    public static readonly SAVED_MAX_USERS: number = 7;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _actions$: Actions,
        private _store: Store<RememberUserReducerType>,
        private _rememberUserStorageService: RememberUserStorageService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Zapisaywanie użytkownika przy logowaniu do magazynu local storage (tylko jeśli checkbox jest na true).
     * Efekt działa tylko dla użytkowników bez obrazka.
     */
    public saveLastUserInStorage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__saveUserAfterSuccessLogin),
            withLatestFrom(this._store.select(REMEMBER_USER_REDUCER)),
            map(([ action, state ]) => {
                if (action.userData && !action.userData.hasPicture) { // dla użytkowników bez obrazka
                    const { ifSaveUserInLastLogin, allSavedAccounts } = state;
                    const ifSaveUser = ifSaveUserInLastLogin && action.userData && action.ifRedirectToRoot;
                    if (ifSaveUser && allSavedAccounts.length < SavedUsersEffects.SAVED_MAX_USERS) {
                        this._rememberUserStorageService.saveUserDataInLocalStorage(action.userData, '');
                    }
                }
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Zapisaywanie użytkownika przy logowaniu do magazynu local storage (tylko jeśli checkbox jest na true).
     * Efekt działa tylko dla użytkowników z dodanym obrazkiem.
     */
    public saveLastUserWithImageInStorage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__saveUserImageAfterSuccessLogin),
            withLatestFrom(this._store.select(REMEMBER_USER_REDUCER)),
            map(([ action, state ]) => { // dla użytkowników z obrazkiem
                const { ifSaveUserInLastLogin, allSavedAccounts } = state;
                const ifSaveUser = ifSaveUserInLastLogin && action.userData;
                if (ifSaveUser && allSavedAccounts.length < SavedUsersEffects.SAVED_MAX_USERS) {
                    this._rememberUserStorageService.saveUserDataInLocalStorage(action.userData!, action.userImage);
                }
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Ładowanie do aplikacji wszystkich zapisanych użytkowników z magazynu local storage oraz ngrx stora.
     */
    public loadAllUsersAccounts$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_REM.__loadAllAccounts),
            map(() => {
                const usersAccounts = this._rememberUserStorageService.loadAllSavedAccounts();
                return NgrxAction_REM.__saveAllAccounts({ usersAccounts });
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Usuwanie wszystkich zapisanych użytkowników z magazynu local storage oraz ngrx stora aplikacji.
     */
    public removeAllSavedUsers$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_REM.__removeAllSavedAccounts),
            map(() => {
                this._rememberUserStorageService.removeAllSaveUsersFromLocalStorage();
                return NgrxAction_REM.__succesedRemoveAllSavedAccounts();
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Usuwanie pojedynczego użytkownika z local storage i ngrx stora na podstawie wartości hash ID.
     */
    public removeSingleSavedUser$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_REM.__removeSingleSavedAccount),
            withLatestFrom(this._store.select(REMEMBER_USER_REDUCER)),
            map(([ action, state ]) => {
                this._rememberUserStorageService.removeSaveUserFromLocalStorageBaseId(action.userId);
                const accountsArrayAfterRemove = state.allSavedAccounts
                    .filter(account => account.dictionaryHash !== action.userId);
                return NgrxAction_REM.__succesedRemoveSingleSavedAccount({ accountsArrayAfterRemove });
            }),
        );
    });
}