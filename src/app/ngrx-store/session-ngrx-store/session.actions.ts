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
import { AuthResponseDataModel } from './ngrx-models/auth-response-data.model';

export const SESSION_LOGIN = '[SESSION] LOGIN';
export const SESSION_AUTO_LOGIN = '[SESSION] AUTO LOGIN';
export const SESSION_SUCCESS_LOGIN = '[SESSION] SUCCESS LOGIN';
export const SESSION_FAILURE_LOGIN = '[SESSION] FAILURE LOGIN';
export const USER_LOGOUT = '[SESSION] LOGOUT';

export const SESSION_GET_IMAGE = '[SESSION] GET USER IMAGE';
export const SESSION_SUCCES_GET_IMAGE = '[SESSION] SUCCESS GET IMAGE';
export const SESSION_FAILURE_GET_IMAGE = '[SESSION] FAILURE GET IMAGE';

export const userLogin = createAction(SESSION_LOGIN, props<{ login: string, password: string }>());
export const userAutoLogin = createAction(SESSION_AUTO_LOGIN);
export const userSuccessLogin = createAction(SESSION_SUCCESS_LOGIN, props<{ data: AuthResponseDataModel | null }>());
export const userFailureLogin = createAction(SESSION_FAILURE_LOGIN, props<{ errorMessage: string }>());
export const userLogout = createAction(USER_LOGOUT);

export const userGetImage = createAction(SESSION_GET_IMAGE, props<{ userId: string, jwt: string }>());
export const userSuccesedGetImage = createAction(SESSION_SUCCES_GET_IMAGE, props<{ imageUri: string }>());
export const userFailuredGetImage = createAction(SESSION_FAILURE_GET_IMAGE);
