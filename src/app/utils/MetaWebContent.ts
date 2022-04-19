/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: MetaWebContent.ts
 * Last modified | Ostatnia modyfikacja: 19/04/2022, 14:44
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

import { Meta, Title } from '@angular/platform-browser';

import { Misc } from './Misc';
import JsonMockedTitles from '../mocked-data/subpages-titles-description.json';


/**
 * Klasa dodająca dodatkowe informacje dla SEO (tytuł strony oraz opis) na podstawie przekazywanej
 * wartości enuma (jako klucza mapującego dany obiekt w zamockowanej tablicy). Żeby użyć klasy w komponencie
 * angulara należy rozszerzyć ją i wywołać konstruktor klasy bazowej przy użyciu słowa super.
 */
export abstract class MetaWebContent {

    private readonly _defPrefix: string;
    private readonly _adminPrefix: string;
    private readonly _defSeparator: string;

    private readonly _mainSubpages: object;
    private readonly _adminSubpages: object;

    protected constructor(
        private titleService: Title,
        private meta: Meta,
        private metaPageExtendor: AllMainWebpages | AllAdminWebpages,
    ) {
        this._defPrefix = JsonMockedTitles.defaultPrefix;
        this._adminPrefix = JsonMockedTitles.adminPanelPrefix;
        this._defSeparator = JsonMockedTitles.defaultSeparator;
        this._mainSubpages = JsonMockedTitles.mainSubpages;
        this._adminSubpages = JsonMockedTitles.adminPanelSubpages;
        this.updateMetaTags();
    };

    private updateMetaTags(): void {
        this.titleService.setTitle(this.combinePageTitleElements(this.metaPageExtendor));
        this.meta.updateTag({
            name: 'description',
            content: this.combinePageDescriptionElements(this.metaPageExtendor),
        });
    };

    private combinePageTitleElements(webpage: AllMainWebpages | AllAdminWebpages): string {
        if (Misc.compareEnum(AllMainWebpages)(webpage)) {
            return `${this._mainSubpages[webpage].title} ${this._defSeparator} ${this._defPrefix}`;
        }
        return `${this._adminSubpages[webpage].title} ${this._defSeparator} ${this._adminPrefix}`;
    };

    private combinePageDescriptionElements(webpage: AllMainWebpages | AllAdminWebpages): string {
        if (Misc.compareEnum(AllMainWebpages)(webpage)) {
            return this._mainSubpages[webpage].description;
        }
        return this._adminSubpages[webpage].description;
    };

}

/**
 * Klucze obiektów meta właściwości dla stron niechronionych.
 */
export enum AllMainWebpages {
    ROOT = 'root',
    SCHEDULE = 'schedule',
    LOGIN = 'login',
    FORGOT_PASSWORD = 'forgotPassword',
    BOOKING = 'booking',
    SEARCH = 'search',
    NOT_FOUND = 'notFound',
}

/**
 * Klucze obiektów meta właściwości dla stron chronionych (panel administratora).
 */
export enum AllAdminWebpages {
    DASHBOARD = 'dashboard',
}