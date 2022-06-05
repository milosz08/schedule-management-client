/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-put-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 04/06/2022, 15:49
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

import { CmsDepartmentReqResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-department-req-res-data.model';
import { CmsAddUpdateReqDataModel, CmsUserResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-register-req-res-data.model';
import { CmsCathedralReqDataModel, CmsCathedralResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-cathedral-req-res-data.model';
import { CmsStudySpecReqDataModel, CmsStudySpecResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-study-spec-req-res-data.model';
import { CmsStudyRoomReqDataModel, CmsStudyRoomResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-study-room-req-res-data.model';
import { CmsStudySubjectReqDataModel, CmsStudySubjectResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-study-subject-req-res-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiedzialny za aktualizowanie istniejących już treści w systmie na podstawie ciała zapytania oraz
 * parametru identyfikującego ID edytowanego elementu.
 */

@Injectable({
    providedIn: 'root',
})
export class CmsPutConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Aktualizowanie informacji o użytkowniku.
     */
    public updateUser(userData: CmsAddUpdateReqDataModel, userId: number, ifUpdateEmailPass: boolean):
        Observable<CmsUserResDataModel> {
        return this._http.put<CmsUserResDataModel>(
            this._endpoints.UPDATE_USER,
            userData,
            { params: { userId, ifUpdateEmailPass } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Aktualizowanie informacji wydziału do bazy danych.
     */
    public updateDepartment(deptData: CmsDepartmentReqResDataModel, deptId: number):
        Observable<CmsDepartmentReqResDataModel> {
        return this._http.put<CmsDepartmentReqResDataModel>(
            this._endpoints.UPDATE_DEPARTMENT,
            deptData,
            { params: { deptId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Aktualizowanie informacji katedry do wydziału do bazy danych.
     */
    public updateCathedral(cathData: CmsCathedralReqDataModel, cathId: number): Observable<CmsCathedralResDataModel> {
        return this._http.put<CmsCathedralResDataModel>(
            this._endpoints.UPDATE_CATHEDRAL,
            cathData,
            { params: { cathId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Aktualizowanie informacji kierunku (powiązanego z wydziałem) do bazy danych.
     */
    public updateStudySpecialization(studyData: CmsStudySpecReqDataModel, specId: number):
        Observable<Array<CmsStudySpecResDataModel>> {
        return this._http.put<Array<CmsStudySpecResDataModel>>(
            this._endpoints.UPDATE_STUDY_SPECIALIZATION,
            studyData,
            { params: { specId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Aktualizowanie informacji sali zajęciowej (powiązanego z katedrą i wydziałem).
     */
    public updateStudyRoom(roomData: CmsStudyRoomReqDataModel, roomId: number): Observable<CmsStudyRoomResDataModel> {
        return this._http.put<CmsStudyRoomResDataModel>(
            this._endpoints.UPDATE_STUDY_ROOM,
            roomData,
            { params: { roomId } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Aktualizowanie informacji przedmiotu (powiązanego z wydziałem i kierunkiem studiów).
     */
    public updateStudySubject(subjectData: CmsStudySubjectReqDataModel, subjId: number):
        Observable<CmsStudySubjectResDataModel> {
        return this._http.put<CmsStudySubjectResDataModel>(
            this._endpoints.UPDATE_STUDY_SUBJECT,
            subjectData,
            { params: { subjId } },
        );
    };
}