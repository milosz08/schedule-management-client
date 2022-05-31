/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-get-all-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 22/05/2022, 17:51
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiConfigurerHelper } from '../../../utils/api-configurer.helper';
import { AvailableDataModel, NameWithId } from '../models/cms-drop-lists-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis umożliwiający pobieranie danych z serwera bez parametryzowania zapytania (wszystkie elementy).
 */

@Injectable()
export class CmsGetAllConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie możliwy typy studiów (stacjonarne/niestacjonarne itp).
     */
    public getAllAvailableStudyTypes(): Observable<AvailableDataModel<NameWithId>> {
        return this._http.get<AvailableDataModel<NameWithId>>(
            this._endpoints.GET_AVAILABLE_STUDY_TYPES,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie możliwy typy studiów (stacjonarne/niestacjonarne itp).
     */
    public getAllAvailableStudyDegrees(): Observable<AvailableDataModel<NameWithId>> {
        return this._http.get<AvailableDataModel<NameWithId>>(
            this._endpoints.GET_AVAILABLE_STUDY_DEGREES,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie możliwy typy studiów (stacjonarne/niestacjonarne itp).
     */
    public getAllAvailableRoles(): Observable<AvailableDataModel<string>> {
        return this._http.get<AvailableDataModel<string>>(
            this._endpoints.GET_AVAILABLE_ROLES,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie możliwe typy sal zajęciowych (laboratoryjna).
     */
    public getAllAvailableRoomTypes(): Observable<AvailableDataModel<string>> {
        return this._http.get<AvailableDataModel<string>>(
            this._endpoints.GET_AVAILABLE_ROOM_TYPES,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie możliwe typy sal zajęciowych (laboratoryjna).
     */
    public getAllAvailableSemesters(): Observable<AvailableDataModel<NameWithId>> {
        return this._http.get<AvailableDataModel<NameWithId>>(
            this._endpoints.GET_AVAILABLE_SEMESTERS,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie możliwe sale zajęciowe na wybranym wydziale.
     */
    public getAllAvailableStudyRoomsBaseDept(deptId: number): Observable<Array<NameWithId>> {
        return this._http.get<Array<NameWithId>>(
            this._endpoints.GET_ALL_STUDY_ROOMS_BASE_DEPT,
            { params: { deptId } }
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkich możliwych nauczycieli na wybranym wydziale na podstawie przypisanego przedmiotu.
     */
    public getAllAvailableTeachersBaseDeptAndSpec(deptId: number, subjName: string): Observable<Array<NameWithId>> {
        return this._http.get<Array<NameWithId>>(
            this._endpoints.GET_ALL_TEACHERS_BASE_DEPT_AND_SUBJ,
            { params: { deptId, subjName } }
        );
    };
}