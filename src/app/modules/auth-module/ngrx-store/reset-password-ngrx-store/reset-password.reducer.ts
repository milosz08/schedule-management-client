/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: reset-password.reducer.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 16:17
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

import * as NgrxAction from './reset-password.actions';
import { initialResetPasswordState } from './reset-password.initial';

//----------------------------------------------------------------------------------------------------------------------

const _resetPasswordReducer = createReducer(
    initialResetPasswordState,
    on(NgrxAction.__successSendResedPasswordToken, (state, action) => {
        return { ...state,
            resetPasswordViaEmail: {
                resetPasswordSendTokenMessage: action.message,
                ifSuccesedSendEmail: true,
            },
        };
    }),
    on(NgrxAction.__failureSendResetPasswordToken, (state, action) => {
        return { ...state,
            resetPasswordViaEmail: {
                resetPasswordSendTokenMessage: action.errorMessage,
                ifSuccesedSendEmail: false,
            },
        };
    }),
    on(NgrxAction.__resetTokenClearMessage, state => {
        return { ...state,
            resetPasswordViaEmail: {
                resetPasswordSendTokenMessage: '',
                ifSuccesedSendEmail: false,
            },
        };
    }),
    on(NgrxAction.__resetPasswordSuccessValidateToken, (state, action) => {
        return { ...state,
            resetPasswordValidateToken: {
                resetPasswordValidTokenMessage: '',
                ifValidateSuccessed: true,
                userEmail: action.payload.email,
                bearerToken: action.payload.bearerToken,
            },
        };
    }),
    on(NgrxAction.__resetPasswordFailureValidateToken, (state, action) => {
        return { ...state,
            resetPasswordValidateToken: {
                resetPasswordValidTokenMessage: action.errorMessage,
                ifValidateSuccessed: false,
                userEmail: '',
                bearerToken: '',
            },
        };
    }),
    on(NgrxAction.__resetValidateTokenClearMessage, state => {
        return { ...state,
            resetPasswordValidateToken: {
                resetPasswordValidTokenMessage: '',
                ifValidateSuccessed: false,
                userEmail: '',
                bearerToken: '',
            },
        };
    }),
    on(NgrxAction.__resetPasswordSucessSetNewPassword, (state, action) => {
        return { ...state,
            resetPasswordFormMessage: action.message,
            ifSuccessedSetNewPassword: true,
        };
    }),
    on(NgrxAction.__resetPasswordFailureSetNewPassword, (state, action) => {
        return { ...state,
            resetPasswordFormMessage: action.errorMessage,
        };
    }),
    on(NgrxAction.__resetPasswordClearFormMessage, state => {
        return { ...state,
            resetPasswordFormMessage: '',
            ifSuccessedSetNewPassword: false,
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export function resetPasswordReducer(state: any, action: any) {
    return _resetPasswordReducer(state, action);
}