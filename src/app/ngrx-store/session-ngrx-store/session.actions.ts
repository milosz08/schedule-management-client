/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: session.actions.ts
 * Last modified | Ostatnia modyfikacja: 22/04/2022, 17:49
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

import { RememberAccountModel } from './ngrx-models/remember-account.model';
import { RefreshTokenResposneModel } from './ngrx-models/refresh-token.model';
import { AuthResponseDataModel } from './ngrx-models/auth-response-data.model';
import { RequestFirstChangePasswordModel } from './ngrx-models/request-first-change-password.model';

//----------------------------------------------------------------------------------------------------------------------

export const SESSION_LOGIN = '[SESSION] LOGIN';
export const SESSION_AUTO_LOGIN = '[SESSION] AUTO LOGIN';
export const SESSION_SUCCESS_LOGIN = '[SESSION] SUCCESS LOGIN';
export const SESSION_FAILURE_LOGIN = '[SESSION] FAILURE LOGIN';
export const SESSION_LOGOUT = '[SESSION] LOGOUT';

//----------------------------------------------------------------------------------------------------------------------

export const SESSION_GET_IMAGE = '[SESSION] GET USER IMAGE';
export const SESSION_SUCCESS_GET_IMAGE = '[SESSION] SUCCESS GET IMAGE';
export const SESSION_FAILURE_GET_IMAGE = '[SESSION] FAILURE GET IMAGE';

//----------------------------------------------------------------------------------------------------------------------

export const SESSION_SET_NEW_TOKEN = '[SESSION] SET NEW TOKEN';
export const SESSION_SUCCESS_SET_NEW_TOKEN = '[SESSION] SUCCESS SET NEW TOKEN';
export const SESSION_FAILURE_SET_NEW_TOKEN = '[SESSION] FAILURE SET NEW TOKEN';

//----------------------------------------------------------------------------------------------------------------------

export const SESSION_UNEXPECTED_SERVER_ERROR = '[SESSION] UNEXPECTED SERVER ERROR';

//----------------------------------------------------------------------------------------------------------------------

export const SESSION_SET_TIME = '[SESSION] SET TIME';
export const SESSION_RENEW = '[SESSION] RENEW SESSION';

//----------------------------------------------------------------------------------------------------------------------

export const SESSION_SET_MODAL_VISIBILITY = '[SESSION] SET END SESSION MODAL VISIBILITY';
export const SESSION_SET_LOGOUT_MODAL_VISIBILITY = '[SESSION] SET LOGOUT MODAL VISIBILITY';

//----------------------------------------------------------------------------------------------------------------------

export const SESSION_TOGGLE_USER_SAVE_ACCOUNT = '[SESSION] TOGGLE USER SAVE ACCOUNT';
export const SESSION_LOAD_ALL_USERS_ACCOUNTS = '[SESSION] LOAD ALL USERS ACCOUNTS';
export const SESSION_SAVE_ALL_USERS_ACCOUNTS_IN_STORAGE = '[SESSION] SAVE ALL USERS ACCOUNTS IN STORAGE';
export const SESSION_SAVE_SINGLE_USER_ACCOUNT = '[SESSION] SAVE SINGLE USER ACCOUNT';
export const SESSION_REMOVE_ALL_SAVED_ACCOUNTS = '[SESSION] REMOVE ALL SAVED ACCOUNTS';
export const SESSION_SUCCESS_REMOVE_ALL_SAVED_ACCOUNTS = '[SESSION] SUCCESS REMOVE ALL SAVED ACCOUNTS';
export const SESSION_REMOVE_SINGLE_SAVED_ACCOUNT = '[SESSION] REMOVE SINGLE SAVED ACCOUNT';
export const SESSION_SUCCESS_REMOVE_SINGLE_SAVED_ACCOUNT = '[SESSION] SUCCESS REMOVE SINGLE SAVED ACCOUNT';
export const SESSION_SET_AUTO_FILLED_EMAIL_VALUE = '[SESSION] SET AUTO FILLED EMAIL VALUE';

//----------------------------------------------------------------------------------------------------------------------

export const SESSION_TOGGLE_CHANGE_PASSWORD_PAGE = '[SESSION] TOGGLE CHANGE PASSWORD PAGE';
export const SESSION_CHANGE_DEFAULT_PASSWORD = '[SESSION] CHANGE DEFAULT PASSWORD';
export const SESSION_AFTER_CHANGE_DEFAULT_PASSWORD = '[SESSION] AFTER CHANGE DEFAULT PASSWORD';
export const SESSION_RESET_CHANGE_DEFAULT_PASSWORD_MESSAGE = '[SESSION] RESET CHANGE DEFAULT PASSWORD MESSAGE';

//----------------------------------------------------------------------------------------------------------------------

export const userLogin = createAction(
    SESSION_LOGIN,
    props<{ login: string, password: string }>()
);

export const userAutoLogin = createAction(
    SESSION_AUTO_LOGIN,
);

export const userSuccessLogin = createAction(
    SESSION_SUCCESS_LOGIN,
    props<{ data: AuthResponseDataModel | null, ifRedirectToRoot: boolean }>(),
);

export const userFailureLogin = createAction(
    SESSION_FAILURE_LOGIN,
    props<{ errorMessage: string }>()
);

export const userLogout = createAction(
    SESSION_LOGOUT,
    props<{ ifRedirectToRoot: boolean }>()
);

//----------------------------------------------------------------------------------------------------------------------

export const userGetImage = createAction(
    SESSION_GET_IMAGE,
    props<{ userId: string, jwt: string }>()
);

export const userSuccesedGetImage = createAction(
    SESSION_SUCCESS_GET_IMAGE,
    props<{ imageUri: string }>()
);

export const userFailuredGetImage = createAction(
    SESSION_FAILURE_GET_IMAGE,
);

//----------------------------------------------------------------------------------------------------------------------

export const userSetNewToken = createAction(
    SESSION_SET_NEW_TOKEN,
    props<{ data: AuthResponseDataModel | null }>(),
);

export const userSuccesedSetNewToken = createAction(
    SESSION_SUCCESS_SET_NEW_TOKEN,
    props<{ newTokens: RefreshTokenResposneModel }>()
);

export const userFailureSetNewToken = createAction(
    SESSION_FAILURE_SET_NEW_TOKEN,
);

//----------------------------------------------------------------------------------------------------------------------

export const serverConnectionFailure = createAction(
    SESSION_UNEXPECTED_SERVER_ERROR,
);

//----------------------------------------------------------------------------------------------------------------------

export const userSessionSetTime = createAction(
    SESSION_SET_TIME,
    props<{ time: number }>(),
);

export const userRenewSession = createAction(
    SESSION_RENEW,
);

//----------------------------------------------------------------------------------------------------------------------

export const userSessionSetModalVisibility = createAction(
    SESSION_SET_MODAL_VISIBILITY,
    props<{ modalVisibility: boolean }>(),
);

export const userLogoutModalSetVisibility = createAction(
    SESSION_SET_LOGOUT_MODAL_VISIBILITY,
    props<{ modalVisibility: boolean }>(),
);

//----------------------------------------------------------------------------------------------------------------------

export const userToggleIfSaveAccount = createAction(
    SESSION_TOGGLE_USER_SAVE_ACCOUNT,
    props<{ ifSaveAccount: boolean }>(),
);

export const loadAllAccounts = createAction(
    SESSION_LOAD_ALL_USERS_ACCOUNTS,
);

export const saveAllAccounts = createAction(
    SESSION_SAVE_ALL_USERS_ACCOUNTS_IN_STORAGE,
    props<{ usersAccounts: Array<RememberAccountModel> }>(),
);

export const saveSingleAccount = createAction(
    SESSION_SAVE_SINGLE_USER_ACCOUNT,
    props<{ userAccount: RememberAccountModel | null }>(),
);

export const removeAllSavedAccounts = createAction(
    SESSION_REMOVE_ALL_SAVED_ACCOUNTS,
);

export const succesedRemoveAllSavedAccounts = createAction(
    SESSION_SUCCESS_REMOVE_ALL_SAVED_ACCOUNTS,
);

export const removeSingleSavedAccount = createAction(
    SESSION_REMOVE_SINGLE_SAVED_ACCOUNT,
    props<{ userId: string }>(),
);

export const succesedRemoveSingleSavedAccount = createAction(
    SESSION_SUCCESS_REMOVE_SINGLE_SAVED_ACCOUNT,
    props<{ accountsArrayAfterRemove: Array<RememberAccountModel> }>(),
);

export const userSetAutoFilledEmail = createAction(
    SESSION_SET_AUTO_FILLED_EMAIL_VALUE,
    props<{ emailValue: string }>(),
);

//----------------------------------------------------------------------------------------------------------------------

export const userToggleChangePasswordPageVisible = createAction(
    SESSION_TOGGLE_CHANGE_PASSWORD_PAGE,
    props<{ pageVisibility: boolean }>(),
);

export const userChangeDefaultPassword = createAction(
    SESSION_CHANGE_DEFAULT_PASSWORD,
    props<{ passwordsPayload: RequestFirstChangePasswordModel }>(),
);

export const userAfterChangeDefaultPassword = createAction(
    SESSION_AFTER_CHANGE_DEFAULT_PASSWORD,
    props<{ message: string }>(),
);

export const userResetChangeDefaultPasswordMessage = createAction(
    SESSION_RESET_CHANGE_DEFAULT_PASSWORD_MESSAGE,
);