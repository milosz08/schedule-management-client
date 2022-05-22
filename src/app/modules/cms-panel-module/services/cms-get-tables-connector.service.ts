/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-get-tables-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 22/05/2022, 17:45
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

import {
    CmsPaginationDataModel, CmsSingleCathDataModel, CmsSingleDeptDataModel, CmsSingleRoomTypeDataModel,
    CmsSingleStudyGroupDataModel, CmsSingleStudySpecDataModel, CmsSingleStudySubjectDataModel, CmsSingleUserDataModel
} from '../models/cms-pagination-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa serwisu służąca do pobierania danych z encji bazy danych dla tabel systemu zarządzania treścią (łączenie się
 * do bazy danych).
 */

@Injectable()
export class CmsGetTablesConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
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
     * Metoda pobierająca wszystkie grupy dziekańskie wszystkich kierunków studiów z bazy danych (parametryzacja zapytania,
     * paginacja i dynamiczne filtrowanie).
     */
    public getAllStudyGroups(params: any): Observable<CmsPaginationDataModel<CmsSingleStudyGroupDataModel>> {
        return this._http.get<CmsPaginationDataModel<CmsSingleStudyGroupDataModel>>(
            this._endpoints.CMS_FILTERED_ALL_STUDY_GROUPS,
            { params },
        );
    };
}