/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: list-navigations.initial.ts
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

import { BasicDataSortBy } from '../../types/basic-data-sort-by.types';
import { AvailablesSortingTypes } from '../../types/availables-sorting.types';

//----------------------------------------------------------------------------------------------------------------------

export interface InitialListNavigationStateTypes {
    searchPhrase: string;
    pageNumber: number;
    pageSize: number;
    allPageSizes: Array<number>;
    sortBy: BasicDataSortBy;
    sortDirection: AvailablesSortingTypes;
}

//----------------------------------------------------------------------------------------------------------------------

export const initialListNavigationState: InitialListNavigationStateTypes = {
    searchPhrase: '',
    pageNumber: 1,
    pageSize: 1,
    allPageSizes: [],
    sortBy: BasicDataSortBy.ID,
    sortDirection: AvailablesSortingTypes.ASC,
};