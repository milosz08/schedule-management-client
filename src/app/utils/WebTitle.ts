/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: WebTitle.ts
 * Last modified | Ostatnia modyfikacja: 10/04/2022, 13:13
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

import JsonMockedTitles from '../mocked-data/subpages-titles-description.json';
import { Misc } from './Misc';


export class WebTitle {

    private readonly _defPrefix: string;
    private readonly _adminPrefix: string;
    private readonly _defSeparator: string;

    private readonly _mainSubpages: object;
    private readonly _adminSubpages: object;

    constructor() {
        this._defPrefix = JsonMockedTitles.defaultPrefix;
        this._adminPrefix = JsonMockedTitles.adminPanelPrefix;
        this._defSeparator = JsonMockedTitles.defaultSeparator;
        this._mainSubpages = JsonMockedTitles.mainSubpages;
        this._adminSubpages = JsonMockedTitles.adminPanelSubpages;
    };

    public combinePageTitleElements(webpage: AllMainWebpages | AllAdminWebpages): string {
        if (Misc.compareEnum(AllMainWebpages)(webpage)) {
            return `${this._mainSubpages[webpage].title} ${this._defSeparator} ${this._defPrefix}`;
        }
        return `${this._adminSubpages[webpage].title} ${this._defSeparator} ${this._adminPrefix}`;
    };

    public combinePageDescriptionElements(webpage: AllMainWebpages | AllAdminWebpages): string {
        if (Misc.compareEnum(AllMainWebpages)(webpage)) {
            return this._mainSubpages[webpage].description;
        }
        return this._adminSubpages[webpage].description;
    };
}

export enum AllMainWebpages {
    ROOT = 'root',
    LOGIN = 'login',
    BOOKING = 'booking',
    SEARCH = 'search',
}

export enum AllAdminWebpages {
    DASHBOARD = 'dashboard',
}