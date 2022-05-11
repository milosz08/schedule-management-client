/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: post-data.reducer.ts
 * Last modified | Ostatnia modyfikacja: 11/05/2022, 20:27
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

import * as NgrxAction from './post-data.actions';
import { initialPostDataState } from './post-data.initial';

//----------------------------------------------------------------------------------------------------------------------

const _postDataReducer = createReducer(
    initialPostDataState,
    on(NgrxAction.__successRegisterNewUser, (state, action) => {
        return { ...state,
            registerNewUser: { ...state.registerNewUser,
                userData: action.userData,
                ifFetching: false,
            },
        };
    }),
    on(NgrxAction.__failureRegisterNewUser, state => {
        return { ...state,
            registerNewUser: { ...state.registerNewUser,
                serverError: 'Problem z dodaniem użytkownika. Spróbuj ponownie.',
                ifFetching: false,
            },
        };
    }),
    on(NgrxAction.__setFetchingRegisterNewUser, state => {
        return { ...state,
            registerNewUser: { ...state.registerNewUser,
                ifFetching: true,
            },
        };
    }),
    on(NgrxAction.__clearRegisterUserData, state => {
        return { ...state,
            registerNewUser: {
                userData: null,
                ifFetching: false,
                serverError: '',
            },
        };
    }),
    on(NgrxAction.__clearRegisterServerError, state => {
        return { ...state,
            registerNewUser: { ...state.registerNewUser,
                serverError: '',
            },
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export function postDataReducer(state: any, action: any) {
    return _postDataReducer(state, action);
}