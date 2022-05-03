/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: reset-password.selectors.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 16:32
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

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InitialResetPasswordStateTypes } from './reset-password.initial';

//----------------------------------------------------------------------------------------------------------------------

export const RESET_PASSWORD_REDUCER = 'resetPasswordReducer' as const;
const getSessionState = createFeatureSelector<InitialResetPasswordStateTypes>(RESET_PASSWORD_REDUCER);

export type ResetPasswordReducerType = { [RESET_PASSWORD_REDUCER]: InitialResetPasswordStateTypes };

const selectorWithInjectedStore = (payload: (state: any, action?: any) => any) => (
    createSelector(getSessionState, payload)
);

//----------------------------------------------------------------------------------------------------------------------

export const sel_resetPasswordSendTokenMessage = selectorWithInjectedStore(
    state => state.resetPasswordViaEmail.resetPasswordSendTokenMessage,
);

export const sel_ifTokenIsSuccessSend = selectorWithInjectedStore(
    state => state.resetPasswordViaEmail.ifSuccesedSendEmail,
);

export const sel_resetPasswordValidTokenMessage = selectorWithInjectedStore(
    state => state.resetPasswordValidateToken.resetPasswordValidTokenMessage,
);

export const sel_ifResetPasswordBearerToken = selectorWithInjectedStore(
    state => state.resetPasswordValidateToken.bearerToken,
);

export const sel_resetPasswordFormMessage = selectorWithInjectedStore(
    state => state.resetPasswordFormMessage,
);

export const sel_ifPasswordNotSet = selectorWithInjectedStore(
    state => !state.ifSuccessedSetNewPassword,
);