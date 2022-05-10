/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: list-navigations.selectors.ts
 * Last modified | Ostatnia modyfikacja: 10/05/2022, 00:17
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

import { InitialListNavigationStateTypes } from './list-navigations.initial';

//----------------------------------------------------------------------------------------------------------------------

export const LIST_NAVIGATIONS_REDUCER = 'listNavigationsReducer' as const;
const getListNavigationsState =
    createFeatureSelector<InitialListNavigationStateTypes>(LIST_NAVIGATIONS_REDUCER);

export type ListNavigationsReducerType = { [LIST_NAVIGATIONS_REDUCER]: InitialListNavigationStateTypes };

const selectorWithInjectedStore = (payload: (state: any, action?: any) => any) => (
    createSelector(getListNavigationsState, payload)
);

//----------------------------------------------------------------------------------------------------------------------

export const sel_combinedNavData = selectorWithInjectedStore(
    state => state,
);

export const sel_availablePaginations = selectorWithInjectedStore(
    state => state.allPageSizes,
);

export const sel_activePagination = selectorWithInjectedStore(
    state => state.pageSize,
);

export const sel_currentPage = selectorWithInjectedStore(
    state => state.pageNumber,
);

export const sel_currentPageAndActivePagination = selectorWithInjectedStore(
    state => ({ currentPage: state.pageNumber, activePagination: state.pageSize }),
);