/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: session.actions.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 17:39
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

import { RefreshTokenResposneModel } from '../../../../models/refresh-token.model';
import { AuthResponseDataModel } from '../../../../models/auth-response-data.model';

//----------------------------------------------------------------------------------------------------------------------

export const LOGIN = '[SESSION] LOGIN';
export const AUTO_LOGIN = '[SESSION] AUTO LOGIN';
export const SUCCESS_LOGIN = '[SESSION] SUCCESS LOGIN';
export const FAILURE_LOGIN = '[SESSION] FAILURE LOGIN';
export const LOGOUT = '[SESSION] LOGOUT';

export const GET_IMAGE = '[SESSION] GET USER IMAGE';
export const SUCCESS_GET_IMAGE = '[SESSION] SUCCESS GET IMAGE';
export const FAILURE_GET_IMAGE = '[SESSION] FAILURE GET IMAGE';

export const SET_NEW_TOKEN = '[SESSION] SET NEW TOKEN';
export const SUCCESS_SET_NEW_TOKEN = '[SESSION] SUCCESS SET NEW TOKEN';
export const FAILURE_SET_NEW_TOKEN = '[SESSION] FAILURE SET NEW TOKEN';

export const SESSION_SET_TIME = '[SESSION] SET TIME';
export const SESSION_RENEW = '[SESSION] RENEW SESSION';

export const SAVE_USER_AFTER_SUCCESS_LOGIN = '[SESSION] SAVE USER AFTER SUCCESS LOGIN';
export const SAVE_USER_IMAGE_AFTER_SUCCESS_LOGIN = '[SESSION] SAVE USER IMAGE AFTER SUCCESS LOGIN';

//----------------------------------------------------------------------------------------------------------------------

export const __login = createAction(
    LOGIN,
    props<{ login: string, password: string }>(),
);

export const __autoLogin = createAction(
    AUTO_LOGIN,
);

export const __successLogin = createAction(
    SUCCESS_LOGIN,
    props<{ data: AuthResponseDataModel | null, ifRedirectToRoot: boolean }>(),
);

export const __failureLogin = createAction(
    FAILURE_LOGIN,
    props<{ errorMessage: string }>(),
);

export const __logout = createAction(
    LOGOUT,
    props<{ ifRedirectToRoot: boolean }>(),
);

export const __getImage = createAction(
    GET_IMAGE,
    props<{ userId: string, jwt: string }>(),
);

export const __succesedGetImage = createAction(
    SUCCESS_GET_IMAGE,
    props<{ imageUri: string }>(),
);

export const __failuredGetImage = createAction(
    FAILURE_GET_IMAGE,
);

export const __setNewToken = createAction(
    SET_NEW_TOKEN,
    props<{ data: AuthResponseDataModel | null }>(),
);

export const __succesedSetNewToken = createAction(
    SUCCESS_SET_NEW_TOKEN,
    props<{ newTokens: RefreshTokenResposneModel }>(),
);

export const __failureSetNewToken = createAction(
    FAILURE_SET_NEW_TOKEN,
);

export const __sessionSetTime = createAction(
    SESSION_SET_TIME,
    props<{ time: number }>(),
);

export const __renewSession = createAction(
    SESSION_RENEW,
);

export const __saveUserAfterSuccessLogin = createAction(
    SAVE_USER_AFTER_SUCCESS_LOGIN,
    props<{ userData: AuthResponseDataModel | null, ifRedirectToRoot: boolean }>(),
);

export const __saveUserImageAfterSuccessLogin = createAction(
    SAVE_USER_IMAGE_AFTER_SUCCESS_LOGIN,
    props<{ userData: AuthResponseDataModel | null, userImage: string }>(),
);