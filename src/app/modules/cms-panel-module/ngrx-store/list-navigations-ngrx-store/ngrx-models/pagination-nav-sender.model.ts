/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: pagination-nav-sender.model.ts
 * Last modified | Ostatnia modyfikacja: 19/05/2022, 00:43
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

import { BasicDataSortBy } from '../../../types/basic-data-sort-by.types';
import { AvailablesSortingTypes } from '../../../types/availables-sorting.types';

import { InitialListNavigationStateTypes } from '../list-navigations.initial';

//----------------------------------------------------------------------------------------------------------------------

export class PaginationNavSender {
    public searchPhrase: string;
    public pageNumber: number;
    public pageSize: number;
    public sortBy: BasicDataSortBy;
    public sortDirection: AvailablesSortingTypes;

    public constructor(initialNav: InitialListNavigationStateTypes) {
        this.searchPhrase = initialNav.searchPhrase;
        this.pageNumber = initialNav.pageNumber;
        this.pageSize = initialNav.pageSize;
        this.sortBy = initialNav.sortBy;
        this.sortDirection = initialNav.sortDirection;
    };
}