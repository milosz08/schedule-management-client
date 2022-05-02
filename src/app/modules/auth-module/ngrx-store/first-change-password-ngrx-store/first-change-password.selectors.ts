/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: first-change-password.selectors.ts
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

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InitialFirstChangePasswordStateTypes } from './first-change-password.initial';

//----------------------------------------------------------------------------------------------------------------------

export const FIRST_CHANGE_PASSWORD_REDUCER = 'firstChangePasswordReducer' as const;
const getFirstChangePasswordState =
    createFeatureSelector<InitialFirstChangePasswordStateTypes>(FIRST_CHANGE_PASSWORD_REDUCER);

const selectorWithInjectedStore = (payload: (state: any, action?: any) => any) =>
    createSelector(getFirstChangePasswordState, payload);

//----------------------------------------------------------------------------------------------------------------------

export const sel_initialChangePasswordMessage = selectorWithInjectedStore(
    state => state.initialChangePasswordMessage,
);