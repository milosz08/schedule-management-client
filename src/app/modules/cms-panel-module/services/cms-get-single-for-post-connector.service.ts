/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-get-single-for-post-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 04/06/2022, 12:44
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
    CathedralBaseIdModel, DepartmentBaseIdModel, StudyRoomBaseIdModel, StudySpecializationBaseIdModel,
    StudySubjectBaseIdModel, UserDetailsBaseIdModel
} from '../models/cms-single-for-put-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiedzialny za pobieranie konkretnych rekordów z bazy danych na podstawie numeru ID. Używany głównie w
 * komponentach aktualizujących zawartość istniejącego już kontentu w systemie.
 */

@Injectable()
export class CmsGetSingleForPostConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wydział z bazy danych na podstawie numeru ID przekazywanego w parametrach.
     */
    public getDepartmentBaseDbId(deptId: number): Observable<DepartmentBaseIdModel> {
        return this._http.get<DepartmentBaseIdModel>(
            this._endpoints.GET_DEPARTMENT_BASE_ID,
            { params: { deptId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca katedrę z bazy danych na podstawie numeru ID przekazywanego w parametrach.
     */
    public getCathedralBaseDbId(cathId: number): Observable<CathedralBaseIdModel> {
        return this._http.get<CathedralBaseIdModel>(
            this._endpoints.GET_CATHEDRAL_BASE_ID,
            { params: { cathId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca salę zajęciową z bazy danych na podstawie numeru ID przekazywanego w parametrach.
     */
    public getStudyRoomBaseDbId(roomId: number): Observable<StudyRoomBaseIdModel> {
        return this._http.get<StudyRoomBaseIdModel>(
            this._endpoints.GET_STUDY_ROOM_BASE_ID,
            { params: { roomId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca kierunek studiów z bazy danych na podstawie numeru ID przekazywanego w parametrach.
     */
    public getStudySpecializationBaseDbId(specId: number): Observable<StudySpecializationBaseIdModel> {
        return this._http.get<StudySpecializationBaseIdModel>(
            this._endpoints.GET_STUDY_SPECIALIZATION_BASE_ID,
            { params: { specId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca przedmiot z bazy danych na podstawie numeru ID przekazywanego w parametrach.
     */
    public getStudySubjectBaseDbId(subjId: number): Observable<StudySubjectBaseIdModel> {
        return this._http.get<StudySubjectBaseIdModel>(
            this._endpoints.GET_STUDY_SUBJECT_BASE_ID,
            { params: { subjId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca użytkownika z bazy danych na podstawie numeru ID przekazywanego w parametrach.
     */
    public getUserAccountDetailsBaseDbId(userId: number): Observable<UserDetailsBaseIdModel> {
        return this._http.get<UserDetailsBaseIdModel>(
            this._endpoints.GET_USER_BASE_ID,
            { params: { userId } },
        );
    };
}