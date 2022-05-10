/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: list-navigations.actions.ts
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

import { createAction, props } from '@ngrx/store';

import { ListNavigationsModel } from './ngrx-models/list-navigations.model';

import { BasicDataSortBy } from '../../types/basic-data-sort-by.types';
import { AvailablesSortingTypes } from '../../types/availables-sorting.types';

//----------------------------------------------------------------------------------------------------------------------

export const INSERT_BASE_LIST_NAVIGATIONS = '[LIST NAVIGATIONS] INSERT BASE LIST NAVIGATIONS';
export const SUCCESS_INSERT_BASE_LIST_NAVIGATIONS = '[LIST NAVIGATIONS] SUCCESS INSERT BASE LIST NAVIGATIONS';
export const CHANGE_SORTING = '[LIST NAVIGATIONS] CHANGE SORTING';
export const CHANGE_PAGINATION_SIZE = '[LIST NAVIGATIONS] CHANGE PAGINATION SIZE';
export const CHANGE_TEXT_QUERY = '[LIST NAVIGATIONS] CHANGE TEXT QUERY';
export const SET_CURRENT_PAGE = '[LIST NAVIGATIONS] SET CURRENT PAGE';
export const INCREASE_PAGE_NUMBER = '[LIST NAGIVATIONS] INCREASE PAGE NUMBER';
export const DECREASE_PAGE_NUMBER = '[LIST NAVIGATIONS] DECREASE PAGE NUMBER'

//----------------------------------------------------------------------------------------------------------------------

export const __insertBaseListNavigations = createAction(
    INSERT_BASE_LIST_NAVIGATIONS,
);

export const __successInsertBaseListNavigations = createAction(
    SUCCESS_INSERT_BASE_LIST_NAVIGATIONS,
    props<{ basicData: ListNavigationsModel }>(),
);

export const __changeListSorting = createAction(
    CHANGE_SORTING,
    props<{ dataSort: BasicDataSortBy, direction: AvailablesSortingTypes }>(),
);

export const __changePaginationSize = createAction(
    CHANGE_PAGINATION_SIZE,
    props<{ paginationSize: number }>(),
);

export const __changeTextQuery = createAction(
    CHANGE_TEXT_QUERY,
    props<{ textQuery: string }>(),
);

export const __setCurrentPage = createAction(
    SET_CURRENT_PAGE,
    props<{ currentPage: number }>(),
);

export const __increasePageNumber = createAction(
    INCREASE_PAGE_NUMBER,
);

export const __decreasePageNumber = createAction(
    DECREASE_PAGE_NUMBER,
);