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

import {
    serverConnectionFailure, userFailuredGetImage, userFailureLogin, userFailureSetNewToken, userLogout,
    userLogoutModalSetVisibility, userSessionSetModalVisibility, userSessionSetTime, userSuccesedGetImage,
    userSuccesedSetNewToken, userSuccessLogin
} from './session.actions';

import { initialSessionState } from './session.initial';


const _sessionReducer = createReducer(
    initialSessionState,
    on(userSuccessLogin, (state, action) => {
        return { ...state,
            userData: action.data,
        };
    }),
    on(userFailureLogin, (state, action) => {
        return { ...state,
            errorMessage: action.errorMessage
        };
    }),
    on(userLogout, state => {
        return { ...state,
            userData: null,
            userImage: '',
            sessionLeftTime: 0,
        };
    }),
    on(userSuccesedGetImage, (state, action) => {
        return { ...state,
            userImage: action.imageUri,
        };
    }),
    on(userFailuredGetImage, state => {
        return { ...state,
            userImage: '',
        };
    }),
    on(serverConnectionFailure, state => {
        return { ...state,
            errorMessage: 'Brak połączenia z serwerem. Spróbuj ponownie później.',
        };
    }),
    on(userSuccesedSetNewToken, (state, action) => {
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
    on(userFailureSetNewToken, state => {
        return { ...state,
            errorMessage: 'Nieudane pozyskanie tokenu odświeżającego. Spróbuj ponownie później.',
        }
    }),
    on(userSessionSetTime, (state, action) => {
        return { ...state,
            sessionLeftTime: action.time,
        };
    }),
    on(userSessionSetModalVisibility, (state, action) => {
        return { ...state,
            sessionEndModalVisibility: action.modalVisibility,
        };
    }),
    on(userLogoutModalSetVisibility, (state, action) => {
        return { ...state,
            logoutModalVisibility: action.modalVisibility,
        };
    }),
);

export function sessionReducer(state: any, action: any) {
    return _sessionReducer(state, action);
}