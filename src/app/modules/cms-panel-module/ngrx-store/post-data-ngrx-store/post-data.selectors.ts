/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: post-data.selectors.ts
 * Last modified | Ostatnia modyfikacja: 11/05/2022, 20:28
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

import { InitialPostDataStateTypes } from './post-data.initial';

//----------------------------------------------------------------------------------------------------------------------

export const POST_DATA_REDUCER = 'postDataReducer' as const;
const getPostDataState = createFeatureSelector<InitialPostDataStateTypes>(POST_DATA_REDUCER);

export type PostDataReducerType = { [POST_DATA_REDUCER]: InitialPostDataStateTypes };

const selectorWithInjectedStore = (payload: (state: any, action?: any) => any) => (
    createSelector(getPostDataState, payload)
);

//----------------------------------------------------------------------------------------------------------------------

export const sel_registeredUserData = selectorWithInjectedStore(
    state => Boolean(state.registerNewUser.userData) ? state.registerNewUser.userData : false,
);

export const sel_registerSuspenseLoading = selectorWithInjectedStore(
    state => state.registerNewUser.ifFetching,
);

export const sel_registerServerErrorMessage = selectorWithInjectedStore(
    state => state.registerNewUser.serverError,
);
