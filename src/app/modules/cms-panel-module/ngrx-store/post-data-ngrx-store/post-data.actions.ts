/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: post-data.actions.ts
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

import { createAction, props } from '@ngrx/store';

import { CmsRegisterRequestDataModel } from './ngrx-models/cms-register-request-data.model';
import { CmsRegisterResponseDataModel } from './ngrx-models/cms-register-response-data.model';

//----------------------------------------------------------------------------------------------------------------------

export const REGISTER_NEW_USER = '[POST DATA] REGISTER NEW USER';
export const SUCCESS_REGISTER_NEW_USER = '[POST DATA] SUCCESS REGISTER NEW USER';
export const FAILURE_REGISTER_NEW_USER = '[POST DATA] FAILURE REGISTER NEW USER';
export const SET_FETCHING_REGISTER_NEW_USER = '[POST DATA] SET FETCHING REGISTER NEW USER';
export const CLEAR_REGISTER_USER_DATA = '[POST DATA] CLEAR REGISTER USER DATA';
export const CLEAR_REGISTER_SERVER_ERROR = '[POST DATA] CLEAR REGISTER SERVER ERROR';

//----------------------------------------------------------------------------------------------------------------------

export const __registerNewUser = createAction(
    REGISTER_NEW_USER,
    props<{ userData: CmsRegisterRequestDataModel }>(),
);

export const __successRegisterNewUser = createAction(
    SUCCESS_REGISTER_NEW_USER,
    props<{ userData: CmsRegisterResponseDataModel }>(),
);

export const __failureRegisterNewUser = createAction(
    FAILURE_REGISTER_NEW_USER,
);

export const __setFetchingRegisterNewUser = createAction(
    SET_FETCHING_REGISTER_NEW_USER,
);

export const __clearRegisterUserData = createAction(
    CLEAR_REGISTER_USER_DATA,
);

export const __clearRegisterServerError = createAction(
    CLEAR_REGISTER_SERVER_ERROR,
);