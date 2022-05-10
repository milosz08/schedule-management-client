/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: list-navigations.reducer.ts
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

import { createReducer, on } from '@ngrx/store';

import * as NgrxAction from './list-navigations.actions';
import { initialListNavigationState } from './list-navigations.initial';

//----------------------------------------------------------------------------------------------------------------------

const _listNavigationsReducer = createReducer(
    initialListNavigationState,
    on(NgrxAction.__successInsertBaseListNavigations, (state, action) => {
        return action.basicData;
    }),
    on(NgrxAction.__changeListSorting, (state, action) => {
        return { ...state,
            sortBy: action.dataSort,
            sortDirection: action.direction,
        };
    }),
    on(NgrxAction.__changePaginationSize, (state, action) => {
        return { ...state,
            pageNumber: 1,
            pageSize: action.paginationSize,
        };
    }),
    on(NgrxAction.__changeTextQuery, (state, action) => {
        return { ...state,
            searchPhrase: action.textQuery,
        };
    }),
    on(NgrxAction.__setCurrentPage, (state, action) => {
        return { ...state,
            pageNumber: action.currentPage,
        };
    }),
    on(NgrxAction.__increasePageNumber, state => {
        let pageNumber = state.pageNumber;
        return { ...state,
            pageNumber: pageNumber + 1,
        };
    }),
    on(NgrxAction.__decreasePageNumber, state => {
        let pageNumber = state.pageNumber;
        return { ...state,
            pageNumber: pageNumber - 1,
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export function listNavigationsReducer(state: any, action: any) {
    return _listNavigationsReducer(state, action);
}