/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: meta-web-content.helper.ts
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

import { MiscHelper } from './misc.helper';
import JsonMockedTitles from '../mocked-data/subpages-titles-description.json';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa dodająca dodatkowe informacje dla SEO (tytuł strony oraz opis) na podstawie przekazywanej
 * wartości enuma (jako klucza mapującego dany obiekt w zamockowanej tablicy). Żeby użyć klasy w komponencie
 * angulara należy rozszerzyć ją i wywołać konstruktor klasy bazowej przy użyciu słowa super.
 */

export abstract class MetaWebContentHelper {

    private readonly _defPrefix: string;
    private readonly _adminPrefix: string;
    private readonly _defSeparator: string;

    private readonly _mainSubpages: object;
    private readonly _adminSubpages: object;

    //------------------------------------------------------------------------------------------------------------------

    protected constructor(
        private titleService: Title,
        private meta: Meta,
        private metaPageExtendor: AllMainWebpages | AllCmsWebpages,
    ) {
        this._defPrefix = JsonMockedTitles.defaultPrefix;
        this._adminPrefix = JsonMockedTitles.adminPanelPrefix;
        this._defSeparator = JsonMockedTitles.defaultSeparator;
        this._mainSubpages = JsonMockedTitles.mainSubpages;
        this._adminSubpages = JsonMockedTitles.cmsPanelSubpages;
        this.updateMetaTags();
    };

    //------------------------------------------------------------------------------------------------------------------

    private updateMetaTags(): void {
        this.titleService.setTitle(this.combinePageTitleElements(this.metaPageExtendor));
        this.meta.updateTag({
            name: 'description',
            content: this.combinePageDescriptionElements(this.metaPageExtendor),
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    private combinePageTitleElements(webpage: AllMainWebpages | AllCmsWebpages): string {
        if (MiscHelper.compareEnum(AllMainWebpages)(webpage)) {
            return `${this._mainSubpages[webpage].title} ${this._defSeparator} ${this._defPrefix}`;
        }
        return `${this._adminSubpages[webpage].title} ${this._defSeparator} ${this._adminPrefix}`;
    };

    //------------------------------------------------------------------------------------------------------------------

    private combinePageDescriptionElements(webpage: AllMainWebpages | AllCmsWebpages): string {
        if (MiscHelper.compareEnum(AllMainWebpages)(webpage)) {
            return this._mainSubpages[webpage].description;
        }
        return this._adminSubpages[webpage].description;
    };

}

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klucze obiektów meta właściwości dla stron niechronionych.
 */
export enum AllMainWebpages {
    ROOT = 'root',
    SCHEDULE = 'schedule',
    LOGIN = 'login',
    RESET_PASSWORD = 'resetPassword',
    FIRST_CHANGE_PASSWORD = 'firstChangePassword',
    BOOKING = 'booking',
    SEARCH = 'search',
    NOT_FOUND = 'notFound',
}

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klucze obiektów meta właściwości dla stron chronionych (panel cms).
 */
export enum AllCmsWebpages {
    DASHBOARD = 'dashboard',
    USERS = 'users',
    CHOOSE_SCHEDULE = 'chooseSchedule',
    SCHEDULE = 'schedule',
    CONTACT_MESSAGES = 'contactMessages',
    ADD_USER = 'addUser',
    EDIT_USER = 'editUser',
    DEPARTMENTS = 'departments',
    ADD_DEPARTMENT = 'addDepartment',
    EDIT_DEPARTMENT = 'editDepartment',
    CATHEDRALS = 'cathedrals',
    ADD_CATHEDRAL = 'addCathedral',
    EDIT_CATHEDRAL = 'editCathedral',
    STUDY_SPECIALIZATION = 'studySpecialization',
    ADD_STUDY_SPECIALIZATION = 'addStudySpecialization',
    EDIT_STUDY_SPECIALIZATION = 'editStudySpecialization',
    STUDY_ROOMS = 'studyRooms',
    ADD_STUDY_ROOM = 'addStudyRoom',
    EDIT_STUDY_ROOM = 'editStudyRoom',
    STUDY_SUBJECTS = 'studySubjects',
    ADD_STUDY_SUBJECT = 'addStudySubject',
    EDIT_STUDY_SUBJECT = 'editStudySubject',
    STUDY_GROUPS = 'studyGroups',
    ADD_STUDY_GROUP = 'addStudyGroup',
}