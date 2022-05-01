/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: session.reducer.ts
 * Last modified | Ostatnia modyfikacja: 09/04/2022, 20:04
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

import * as ReducerAction from './session.actions';
import { initialSessionState } from './session.initial';

/**
 * Reducer function for session ngrx store.
 */

const _sessionReducer = createReducer(
    initialSessionState,
    on(ReducerAction.userSuccessLogin, (state, action) => {
        return { ...state,
            userData: action.data,
        };
    }),
    on(ReducerAction.userFailureLogin, (state, action) => {
        return { ...state,
            errorMessage: action.errorMessage
        };
    }),
    on(ReducerAction.userLogout, state => {
        return { ...state,
            userData: null,
            userImage: '',
            sessionLeftTime: 0,
        };
    }),
    on(ReducerAction.userSuccesedGetImage, (state, action) => {
        return { ...state,
            userImage: action.imageUri,
        };
    }),
    on(ReducerAction.userFailuredGetImage, state => {
        return { ...state,
            userImage: '',
        };
    }),
    on(ReducerAction.serverConnectionFailure, state => {
        return { ...state,
            errorMessage: 'Brak połączenia z serwerem. Spróbuj ponownie później.',
        };
    }),
    on(ReducerAction.userSuccesedSetNewToken, (state, action) => {
        if (state.userData) {
            const { bearerToken, refreshBearerToken, tokenExpirationDate } = action.newTokens;
            return { ...state,
                userData: { ...state.userData!,
                    bearerToken,
                    refreshBearerToken,
                    tokenExpirationDate,
                },
            };
        }
        return state;
    }),
    on(ReducerAction.userFailureSetNewToken, state => {
        return { ...state,
            errorMessage: 'Nieudane pozyskanie tokenu odświeżającego. Spróbuj ponownie później.',
        }
    }),
    on(ReducerAction.userSessionSetTime, (state, action) => {
        return { ...state,
            sessionLeftTime: action.time,
        };
    }),
    on(ReducerAction.userSessionSetModalVisibility, (state, action) => {
        return { ...state,
            sessionEndModalVisibility: action.modalVisibility,
        };
    }),
    on(ReducerAction.userLogoutModalSetVisibility, (state, action) => {
        return { ...state,
            logoutModalVisibility: action.modalVisibility,
        };
    }),
    on(ReducerAction.userToggleIfSaveAccount, (state, action) => {
        return { ...state,
            ifSaveUserInLastLogin: action.ifSaveAccount,
        };
    }),
    on(ReducerAction.saveAllAccounts, (state, action) => {
        return { ...state,
            allSavedAccounts: action.usersAccounts,
        };
    }),
    on(ReducerAction.saveSingleAccount, (state, action) => {
        if (action.userAccount) {
            return { ...state,
                allSavedAccounts: [ ...state.allSavedAccounts, action.userAccount ],
            };
        }
        return state;
    }),
    on(ReducerAction.succesedRemoveAllSavedAccounts, state => {
        if (state.allSavedAccounts.length !== 0) {
            return { ...state,
                allSavedAccounts: [],
            };
        }
        return state;
    }),
    on(ReducerAction.succesedRemoveSingleSavedAccount, (state, action) => {
        return { ...state,
            allSavedAccounts: action.accountsArrayAfterRemove,
        };
    }),
    on(ReducerAction.userSetAutoFilledEmail, (state, action) => {
        return { ...state,
            autoFilledEmail: action.emailValue,
        };
    }),
    on(ReducerAction.userAfterChangeDefaultPassword, (state, action) => {
        return { ...state,
            initialChangePasswordMessage: action.message,
        };
    }),
    on(ReducerAction.userResetChangeDefaultPasswordMessage, state => {
        return { ...state,
            initialChangePasswordMessage: '',
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export function sessionReducer(state: any, action: any) {
    return _sessionReducer(state, action);
}