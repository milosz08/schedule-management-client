/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: first-change-password.actions.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 17:10
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

import { RequestFirstChangePasswordModel } from '../../../../models/request-first-change-password.model';

//----------------------------------------------------------------------------------------------------------------------

export const TOGGLE_CHANGE_PASSWORD_PAGE = '[FIRST CHANGE PASSWORD] TOGGLE CHANGE PASSWORD PAGE';
export const CHANGE_DEFAULT_PASSWORD = '[FIRST CHANGE PASSWORD] CHANGE DEFAULT PASSWORD';
export const AFTER_CHANGE_DEFAULT_PASSWORD = '[FIRST CHANGE PASSWORD] AFTER CHANGE DEFAULT PASSWORD';
export const RESET_CHANGE_DEFAULT_PASSWORD_MESSAGE = '[FIRST CHANGE PASSWORD] RESET CHANGE DEFAULT PASSWORD MESSAGE';

//----------------------------------------------------------------------------------------------------------------------

export const __toggleChangePasswordPageVisible = createAction(
    TOGGLE_CHANGE_PASSWORD_PAGE,
    props<{ pageVisibility: boolean }>(),
);

export const __changeDefaultPassword = createAction(
    CHANGE_DEFAULT_PASSWORD,
    props<{ passwordsPayload: RequestFirstChangePasswordModel }>(),
);

export const __afterChangeDefaultPassword = createAction(
    AFTER_CHANGE_DEFAULT_PASSWORD,
    props<{ message: string }>(),
);

export const __resetChangeDefaultPasswordMessage = createAction(
    RESET_CHANGE_DEFAULT_PASSWORD_MESSAGE,
);