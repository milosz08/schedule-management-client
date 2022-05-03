/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: reset-password.actions.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 16:21
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

import { createAction, props } from '@ngrx/store';

import { RequestResetPasswordModel } from '../../../../models/request-reset-password.model';
import { ResponseResetPasswordTokenModel } from '../../../../models/response-reset-password-token.model';

//----------------------------------------------------------------------------------------------------------------------

export const RESET_PASSWORD_SEND_TOKEN = '[RESET PASSWORD] SEND TOKEN';
export const SUCCESS_PASSWORD_SEND_TOKEN = '[RESET PASSWORD] SUCCESS SEND TOKEN';
export const FAILURE_PASSWORD_SEND_TOKEN = '[RESET PASSWORD] FAILURE SEND TOKEN';
export const RESET_PASSWORD_SEND_TOKEN_CLEAR_MESSAGE = '[RESET PASSWORD] SEND TOKEN CLEAR MESSAGE';

//----------------------------------------------------------------------------------------------------------------------

export const RESET_PASSWORD_VALIDATE_TOKEN = '[RESET PASSWORD] VALIDATE TOKEN';
export const RESET_PASSWORD_SUCCESS_VALIDATE_TOKEN = '[RESET PASSWORD] SUCCESS VALIDATE TOKEN';
export const RESET_PASSWORD_FAILURE_VALIDATE_TOKEN = '[RESET PASSWORD] FAILURE VALIDATE TOKEN';
export const RESET_PASSWORD_VALIDATE_TOKEN_CLEAR_MESSAGE = '[RESET PASSWORD] VALIDATE TOKEN CLEAR MESSAGE';

//----------------------------------------------------------------------------------------------------------------------

export const RESET_PASSWORD_SEND_NEW_PASSWORD = '[RESET PASSWORD] SEND NEW PASSWORD';
export const RESET_PASSWORD_SUCCESS_SET_NEW_PASSWORD = '[RESET PASSWORD] SUCCESS SET NEW PASSWORD';
export const RESET_PASSWORD_FAILURE_SET_NEW_PASSWORD = '[RESET PASSWORD] FAILURE SET NEW PASSWORD';
export const RESET_PASSWORD_CLEAR_FORM_MESSAGE = '[RESET PASSWORD] CLEAR FORM MESSAGE';

//----------------------------------------------------------------------------------------------------------------------

export const __sendResetPasswordToken = createAction(
    RESET_PASSWORD_SEND_TOKEN,
    props<{ email: string }>(),
);

export const __successSendResedPasswordToken = createAction(
    SUCCESS_PASSWORD_SEND_TOKEN,
    props<{ message: string }>(),
);

export const __failureSendResetPasswordToken = createAction(
    FAILURE_PASSWORD_SEND_TOKEN,
    props<{ errorMessage: string }>(),
);

export const __resetTokenClearMessage = createAction(
    RESET_PASSWORD_SEND_TOKEN_CLEAR_MESSAGE,
);

//----------------------------------------------------------------------------------------------------------------------

export const __resetPasswordValidateToken = createAction(
    RESET_PASSWORD_VALIDATE_TOKEN,
    props<{ token: string }>(),
);

export const __resetPasswordSuccessValidateToken = createAction(
    RESET_PASSWORD_SUCCESS_VALIDATE_TOKEN,
    props<{ payload: ResponseResetPasswordTokenModel }>(),
);

export const __resetPasswordFailureValidateToken = createAction(
    RESET_PASSWORD_FAILURE_VALIDATE_TOKEN,
    props<{ errorMessage: string }>(),
);

export const __resetValidateTokenClearMessage = createAction(
    RESET_PASSWORD_VALIDATE_TOKEN_CLEAR_MESSAGE,
);

//----------------------------------------------------------------------------------------------------------------------

export const __resetPasswordSendNewPassword = createAction(
    RESET_PASSWORD_SEND_NEW_PASSWORD,
    props<{ passwordsPayload: RequestResetPasswordModel }>(),
);

export const __resetPasswordSucessSetNewPassword = createAction(
    RESET_PASSWORD_SUCCESS_SET_NEW_PASSWORD,
    props<{ message: string }>(),
);

export const __resetPasswordFailureSetNewPassword = createAction(
    RESET_PASSWORD_FAILURE_SET_NEW_PASSWORD,
    props<{ errorMessage: string }>(),
);

export const __resetPasswordClearFormMessage = createAction(
    RESET_PASSWORD_CLEAR_FORM_MESSAGE,
);