/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: session.reducer.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 17:41
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

import * as NgrxAction from './session.actions';
import { initialSessionState } from './session.initial';

//----------------------------------------------------------------------------------------------------------------------

const _sessionReducer = createReducer(
    initialSessionState,
    on(NgrxAction.__successLogin, (state, action) => {
        return { ...state,
            userData: action.data,
        };
    }),
    on(NgrxAction.__failureLogin, (state, action) => {
        return { ...state,
            errorMessage: action.errorMessage
        };
    }),
    on(NgrxAction.__logout, state => {
        return { ...state,
            userData: null,
            userImage: '',
            sessionLeftTime: 0,
        };
    }),
    on(NgrxAction.__succesedGetImage, (state, action) => {
        return { ...state,
            userImage: action.imageUri,
        };
    }),
    on(NgrxAction.__failuredGetImage, state => {
        return { ...state,
            userImage: '',
        };
    }),
    on(NgrxAction.__succesedSetNewToken, (state, action) => {
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
    on(NgrxAction.__failureSetNewToken, state => {
        return { ...state,
            errorMessage: 'Nieudane pozyskanie tokenu odświeżającego. Spróbuj ponownie później.',
        }
    }),
    on(NgrxAction.__sessionSetTime, (state, action) => {
        return { ...state,
            sessionLeftTime: action.time,
        };
    }),
    on(NgrxAction.__successUpdateOrAddUserImage, (state, action) => {
        return { ...state,
            userData: { ...state.userData!,
                hasPicture: true,
            },
            userImage: action.userImageUrl,
            updateImageServerRes: action.serverRes,
        };
    }),
    on(NgrxAction.__failureUpdateOrAddUserImage, (state, action) => {
        return { ...state,
            updateImageServerRes: action.serverRes,
            ifUpdateImageServerError: true,
        };
    }),
    on(NgrxAction.__successDeleteUserImage, (state, action) => {
        return { ...state,
            userData: { ...state.userData!,
                hasPicture: false,
            },
            userImage: '',
            updateImageServerRes: action.serverRes,
        };
    }),
    on(NgrxAction.__failureDeleteUserImage, (state, action) => {
        return { ...state,
            updateImageServerRes: action.serverRes,
            ifUpdateImageServerError: true,
        };
    }),
    on(NgrxAction.__changeUserImageErrorMessage, (state, action) => {
        return { ...state,
            updateImageServerRes: action.serverRes,
            ifUpdateImageServerError: Boolean(action.ifError),
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export function sessionReducer(state: any, action: any) {
    return _sessionReducer(state, action);
}