/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: remember-user.actions.ts
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

import { createAction, props } from '@ngrx/store';

import { RememberAccountModel } from '../../../../models/remember-account.model';

//----------------------------------------------------------------------------------------------------------------------

export const TOGGLE_USER_SAVE_ACCOUNT = '[REMEMBER USER] TOGGLE USER SAVE ACCOUNT';
export const LOAD_ALL_USERS_ACCOUNTS = '[REMEMBER USER] LOAD ALL USERS ACCOUNTS';
export const SAVE_ALL_USERS_ACCOUNTS_IN_STORAGE = '[REMEMBER USER] SAVE ALL USERS ACCOUNTS IN STORAGE';
export const SAVE_SINGLE_USER_ACCOUNT = '[REMEMBER USER] SAVE SINGLE USER ACCOUNT';
export const REMOVE_ALL_SAVED_ACCOUNTS = '[REMEMBER USER] REMOVE ALL SAVED ACCOUNTS';
export const SUCCESS_REMOVE_ALL_SAVED_ACCOUNTS = '[REMEMBER USER] SUCCESS REMOVE ALL SAVED ACCOUNTS';
export const REMOVE_SINGLE_SAVED_ACCOUNT = '[REMEMBER USER] REMOVE SINGLE SAVED ACCOUNT';
export const SUCCESS_REMOVE_SINGLE_SAVED_ACCOUNT = '[REMEMBER USER] SUCCESS REMOVE SINGLE SAVED ACCOUNT';
export const SET_AUTO_FILLED_EMAIL_VALUE = '[REMEMBER USER] SET AUTO FILLED EMAIL VALUE';

//----------------------------------------------------------------------------------------------------------------------

export const __toggleIfSaveAccount = createAction(
    TOGGLE_USER_SAVE_ACCOUNT,
    props<{ ifSaveAccount: boolean }>(),
);

export const __loadAllAccounts = createAction(
    LOAD_ALL_USERS_ACCOUNTS,
);

export const __saveAllAccounts = createAction(
    SAVE_ALL_USERS_ACCOUNTS_IN_STORAGE,
    props<{ usersAccounts: Array<RememberAccountModel> }>(),
);

export const __saveSingleAccount = createAction(
    SAVE_SINGLE_USER_ACCOUNT,
    props<{ userAccount: RememberAccountModel | null }>(),
);

export const __removeAllSavedAccounts = createAction(
    REMOVE_ALL_SAVED_ACCOUNTS,
);

export const __succesedRemoveAllSavedAccounts = createAction(
    SUCCESS_REMOVE_ALL_SAVED_ACCOUNTS,
);

export const __removeSingleSavedAccount = createAction(
    REMOVE_SINGLE_SAVED_ACCOUNT,
    props<{ userId: string }>(),
);

export const __succesedRemoveSingleSavedAccount = createAction(
    SUCCESS_REMOVE_SINGLE_SAVED_ACCOUNT,
    props<{ accountsArrayAfterRemove: Array<RememberAccountModel> }>(),
);

export const __setAutoFilledEmail = createAction(
    SET_AUTO_FILLED_EMAIL_VALUE,
    props<{ emailValue: string }>(),
);