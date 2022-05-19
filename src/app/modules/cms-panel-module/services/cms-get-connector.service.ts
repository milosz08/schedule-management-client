/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-get-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 09/05/2022, 16:22
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
import { AvailableDataModel, RoomDataModel, StudyDataModel } from '../models/cms-drop-lists-data.model';

import {
    CmsPaginationDataModel, CmsSingleCathDataModel, CmsSingleDeptDataModel, CmsSingleRoomTypeDataModel,
    CmsSingleStudySpecDataModel, CmsSingleStudySubjectDataModel, CmsSingleUserDataModel
} from '../models/cms-pagination-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa serwisu służąca do pobierania danych z encji bazy danych dla systemu zarządzania treścią (łączenie się
 * do bazy danych).
 */

@Injectable()
export class CmsGetConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkich użytkowników z bazy danych (parametryzacja zapytania,
     * paginacja i dynamiczne filtrowanie).
     */
    public getAllUsers(params: any): Observable<CmsPaginationDataModel<CmsSingleUserDataModel>> {
        return this._http.get<CmsPaginationDataModel<CmsSingleUserDataModel>>(
            this._endpoints.CMS_FILTERED_ALL_USERS,
            { params },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie wydziały z bazy danych (parametryzacja zapytania,
     * paginacja i dynamiczne filtrowanie).
     */
    public getAllDepartments(params: any): Observable<CmsPaginationDataModel<CmsSingleDeptDataModel>> {
        return this._http.get<CmsPaginationDataModel<CmsSingleDeptDataModel>>(
            this._endpoints.CMS_FILTERED_ALL_DEPTS,
            { params },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie katedry z bazy danych (parametryzacja zapytania,
     * paginacja i dynamiczne filtrowanie).
     */
    public getAllCathedrals(params: any): Observable<CmsPaginationDataModel<CmsSingleCathDataModel>> {
        return this._http.get<CmsPaginationDataModel<CmsSingleCathDataModel>>(
            this._endpoints.CMS_FILTERED_ALL_CATHEDRALS,
            { params },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie sale zajęciowe z bazy danych (parametryzacja zapytania,
     * paginacja i dynamiczne filtrowanie).
     */
    public getAllStudyRooms(params: any): Observable<CmsPaginationDataModel<CmsSingleRoomTypeDataModel>> {
        return this._http.get<CmsPaginationDataModel<CmsSingleRoomTypeDataModel>>(
            this._endpoints.CMS_FILTERED_ALL_STUDY_ROOMS,
            { params },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie kierunki studiów z bazy danych (parametryzacja zapytania,
     * paginacja i dynamiczne filtrowanie).
     */
    public getAllStudySpecs(params: any): Observable<CmsPaginationDataModel<CmsSingleStudySpecDataModel>> {
        return this._http.get<CmsPaginationDataModel<CmsSingleStudySpecDataModel>>(
            this._endpoints.CMS_FILTERED_ALL_STUDY_SPECS,
            { params },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie przedmioty wszystkich kierunków studiów z bazy danych (parametryzacja zapytania,
     * paginacja i dynamiczne filtrowanie).
     */
    public getAllStudySubjects(params: any): Observable<CmsPaginationDataModel<CmsSingleStudySubjectDataModel>> {
        return this._http.get<CmsPaginationDataModel<CmsSingleStudySubjectDataModel>>(
            this._endpoints.CMS_FILTERED_ALL_STUDY_SUBJECTS,
            { params },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie możliwy typy studiów (stacjonarne/niestacjonarne itp).
     */
    public getAllAvailableStudyTypes(): Observable<AvailableDataModel<StudyDataModel>> {
        return this._http.get<AvailableDataModel<StudyDataModel>>(
            this._endpoints.GET_AVAILABLE_STUDY_TYPES
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie możliwe typy sal zajęciowych (laboratoryjna).
     */
    public getAllAvailableRoomTypes(): Observable<AvailableDataModel<RoomDataModel>> {
        return this._http.get<AvailableDataModel<RoomDataModel>>(
            this._endpoints.GET_AVAILABLE_ROOM_TYPES
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca listę wydziałów na podstawie parametru wyszukiwania.
     */
    public getQueryDepartmentsList(deptQuerySearch: string): Observable<AvailableDataModel<string>> {
        return this._http.get<AvailableDataModel<string>>(
            this._endpoints.GET_ALL_DEPARTMENTS_LIST,
            { params: { deptQuerySearch } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca listę katedr przypisanych do danego wydziału (na podstawie parametrów zapytania).
     */
    public getQueryCathedralsBasedDeptList(cathQuery: string, deptQuery: string): Observable<AvailableDataModel<string>> {
        return this._http.get<AvailableDataModel<string>>(
            this._endpoints.GET_ALL_CATHEDRALS_BASED_DEPARTMENT,
            { params: { cathQuery, deptQuery } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca listę kierunków studiów przypisanych do danego wydziału (na podstawie parametrów zapytania).
     */
    public getQueryStudySpecsBasedDeptList(specQuery: string, deptQuery: string): Observable<AvailableDataModel<string>> {
        return this._http.get<AvailableDataModel<string>>(
            this._endpoints.GET_ALL_STUDY_SPEC_BASED_DEPARTMENT,
            { params: { specQuery, deptQuery } },
        );
    };
}