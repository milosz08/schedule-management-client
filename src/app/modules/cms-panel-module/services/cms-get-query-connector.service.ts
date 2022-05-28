/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-get-query-connector.service.ts
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
import { AvailableDataModel, NameWithId } from '../models/cms-drop-lists-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis umożliwiający pobieranie danych z serwera z parametryzowanym zapytaniem (filtracja wszystkich elementów na
 * serwerze na podstawie parametrów zapytania).
 */

@Injectable()
export class CmsGetQueryConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca listę przedmiotów przypisanych do danego wydziału - kierunku (na podstawie parametrów zapytania).
     */
    public getAllAvilableSubjectsBasedDept(deptName: string): Observable<AvailableDataModel<NameWithId>> {
        return this._http.get<AvailableDataModel<NameWithId>>(
            this._endpoints.GET_AVAILABLE_SUBJECTS_BASE_DEPT,
            { params: { deptName } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca listę przedmiotów przypisanych do danego wydziału - kierunku (na podstawie parametrów zapytania).
     */
    public getAllAvilableStudySpecsBasedDept(deptName: string): Observable<AvailableDataModel<NameWithId>> {
        return this._http.get<AvailableDataModel<NameWithId>>(
            this._endpoints.GET_AVAILABLE_STUDY_SPECS_BASE_DEPT,
            { params: { deptName } },
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
     * Metoda pobierająca listę typów przedmiotów na podstawie parametru wyszukiwania.
     */
    public getQueryScheduleSubjectTypesList(subjTypeName: string): Observable<AvailableDataModel<string>> {
        return this._http.get<AvailableDataModel<string>>(
            this._endpoints.GET_AVAILABLE_SUBJECT_TYPES,
            { params: { subjTypeName } },
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

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie możliwy typy studiów (stacjonarne/niestacjonarne itp).
     */
    public getQueryGroupsBaseDeptAndSpec(groupName: string, deptName: string, studySpecName: string)
        : Observable<AvailableDataModel<string>> {
        return this._http.get<AvailableDataModel<string>>(
            this._endpoints.GET_AVAILABLE_GROUPS_BASE_SPEC,
            { params: { groupName, deptName, studySpecName } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie możliwy typy studiów (stacjonarne/niestacjonarne itp).
     */
    public getQuerySubjectsBaseDeptAndSpec(subjcName: string, deptId: number, studySpecId: number)
        : Observable<AvailableDataModel<string>> {
        return this._http.get<AvailableDataModel<string>>(
            this._endpoints.GET_ALL_STUDY_SUBJECTS_BASE_DEPT,
            { params: { subjcName, deptId, studySpecId } },
        );
    };
}