/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: get-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 19/05/2022, 17:48
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

import { ScheduleNavListModel } from '../models/schedule-nav-list.model';
import { SearchQueryReqModel, SearchQueryResModel } from '../models/search-query.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis zapewniający dostęp do niechronionych zasób z serwera (głównie pobiera listy wszystkich elementów w bazie
 * danych filtrowane przez zapytanie).
 */

@Injectable()
export class GetConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie wydziały i zwracająca je w postaci tablicy obiektów (nazwa i id).
     */
    public getAllDepartments(): Observable<Array<ScheduleNavListModel>> {
        return this._http.get<Array<ScheduleNavListModel>>(
            this._endpoints.GET_ALL_DEPARTMENTS_SCHEDULE,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie kierunku studiów (na podstawie wybranego wydziału) i zwracająca je w postaci
     * tablicy obiektów (nazwa i id).
     */
    public getAllStudySpecs(deptId: number, degreeId: number): Observable<Array<ScheduleNavListModel>> {
        return this._http.get<Array<ScheduleNavListModel>>(
            this._endpoints.GET_ALL_STUDY_SPEC_SCHEDULE,
            { params: { deptId, degreeId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie katedry (na podstawie wybranego wydziału) i zwracająca je w postaci tablicy
     * obiektów (nazwa i id).
     */
    public getAllCathedrals(deptId: number): Observable<Array<ScheduleNavListModel>> {
        return this._http.get<Array<ScheduleNavListModel>>(
            this._endpoints.GET_ALL_CATHEDRALS_SCHEDULE,
            { params: { deptId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie sale zajęciowe (na podstawie wybranej katedry) i zwracająca je w postaci tablicy
     * obiektów (nazwa i id).
     */
    public getAllStudyRooms(deptId: number, cathId: number): Observable<Array<ScheduleNavListModel>> {
        return this._http.get<Array<ScheduleNavListModel>>(
            this._endpoints.GET_ALL_STUDY_ROOMS_SCHEDULE,
            { params: { deptId, cathId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkich pracowników (na podstawie wybranej katedry) i zwracająca je w postaci tablicy
     * obiektów (nazwa i id).
     */
    public getAllEmployeers(deptId: number, cathId: number): Observable<Array<ScheduleNavListModel>> {
        return this._http.get<Array<ScheduleNavListModel>>(
            this._endpoints.GET_ALL_EMPLOYEERS_SCHEDULE,
            { params: { deptId, cathId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie semestry dla dostępnych grup dziekańskich na wybranym kierunku studiów na wybranym
     * wydziale i zwracająca je w postaci tablicy obiektów (nazwa i id).
     */
    public getAllSemesterBaseStudyGroup(deptId: number, studySpecId: number): Observable<Array<ScheduleNavListModel>> {
        return this._http.get<Array<ScheduleNavListModel>>(
            this._endpoints.GET_AVAILABLE_SEM_BASE_STUDY_GROUP,
            { params: { deptId, studySpecId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie grupy na podstawie wybranego kierunku oraz semestru i zwracająca je w postaci
     * tablicy obiektów (nazwa i id).
     */
    public getAllGroupsBaseStudySpecAndSem(studySpecId: number, semId: number): Observable<Array<ScheduleNavListModel>> {
        return this._http.get<Array<ScheduleNavListModel>>(
            this._endpoints.GET_AVAILABLE_GROUPS_BASE_SPEC_AND_SEM,
            { params: { studySpecId, semId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie stopnie dostępne dla wszystkich specjalizacji na wybranym wydziale i zwracająca je w
     * postaci tablicy obiektów (nazwa i id).
     */
    public getAllDegreesBaseStudySpecs(deptId: number): Observable<Array<ScheduleNavListModel>> {
        return this._http.get<Array<ScheduleNavListModel>>(
            this._endpoints.GET_AVAIALBLE_DEGREES_BASE_STUDY_SPEC,
            { params: { deptId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda filtrująca i zwracająca rezultat zapytania masowego wyszukiwania treści serwera. Jeśli nic nie znajdzie,
     * zwracana jest pusta tablica opakowana w Observable object.
     */
    public getAllElementsBaseSearchQueryPage(params: SearchQueryReqModel): Observable<Array<SearchQueryResModel>> {
        return this._http.get<Array<SearchQueryResModel>>(
            this._endpoints.GET_MASSIVE_QUERY_RESULT,
            { params: { ...params } },
        );
    };
}