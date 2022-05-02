/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: remember-user.reducer.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 17:01
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

import { createReducer, on } from '@ngrx/store';

import * as NgrxAction from './remember-user.actions';
import { initialRememberUserState } from './remember-user.initial';

//----------------------------------------------------------------------------------------------------------------------

const _rememberUserReducer = createReducer(
    initialRememberUserState,
    on(NgrxAction.__toggleIfSaveAccount, (state, action) => {
        return { ...state,
            ifSaveUserInLastLogin: action.ifSaveAccount,
        };
    }),
    on(NgrxAction.__saveAllAccounts, (state, action) => {
        return { ...state,
            allSavedAccounts: action.usersAccounts,
        };
    }),
    on(NgrxAction.__saveSingleAccount, (state, action) => {
        if (action.userAccount) {
            return { ...state,
                allSavedAccounts: [ ...state.allSavedAccounts, action.userAccount ],
            };
        }
        return state;
    }),
    on(NgrxAction.__succesedRemoveAllSavedAccounts, state => {
        if (state.allSavedAccounts.length !== 0) {
            return { ...state,
                allSavedAccounts: [],
            };
        }
        return state;
    }),
    on(NgrxAction.__succesedRemoveSingleSavedAccount, (state, action) => {
        return { ...state,
            allSavedAccounts: action.accountsArrayAfterRemove,
        };
    }),
    on(NgrxAction.__setAutoFilledEmail, (state, action) => {
        return { ...state,
            autoFilledEmail: action.emailValue,
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export function rememberUserReducer(state: any, action: any) {
    return _rememberUserReducer(state, action);
}