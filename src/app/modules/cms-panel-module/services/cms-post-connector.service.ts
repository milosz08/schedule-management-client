/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-post-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 11/05/2022, 18:43
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
import { ResponseServerMessageModel } from '../../../models/response-server-message.model';

import { CmsDepartmentReqResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-department-req-res-data.model';
import { CmsScheduleActivityReqModel } from '../ngrx-store/schedule-manipulator-ngrx-store/ngrx-models/cms-schedule-activity-req.model';
import { CmsRegisterReqDataModel, CmsRegisterResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-register-req-res-data.model';
import { CmsCathedralReqDataModel, CmsCathedralResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-cathedral-req-res-data.model';
import { CmsStudySpecReqDataModel, CmsStudySpecResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-study-spec-req-res-data.model';
import { CmsStudyRoomReqDataModel, CmsStudyRoomResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-study-room-req-res-data.model';
import { CmsStudyGroupReqDataModel, CmsStudyGroupResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-study-group-req-res-data.model';
import { CmsStudySubjectReqDataModel, CmsStudySubjectResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-study-subject-req-res-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiedzialny za łączenie się z API i wykonywanie zapytań POST do serwera (dodawanie nowych danych).
 */

@Injectable({
    providedIn: 'root'
})
export class CmsPostConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Rejestrowanie nowego użytkownika.
     */
    public registerUser(newUserData: CmsRegisterReqDataModel): Observable<CmsRegisterResDataModel> {
        return this._http.post<CmsRegisterResDataModel>(
            this._endpoints.REGISTER_USER,
            newUserData,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Dodawanie nowego wydziału do bazy danych.
     */
    public addNewDepartment(deptData: CmsDepartmentReqResDataModel): Observable<CmsDepartmentReqResDataModel> {
        return this._http.post<CmsDepartmentReqResDataModel>(
            this._endpoints.ADD_NEW_DEPARTMENT,
            deptData,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Dodawanie nowej katedry do wydziału do bazy danych.
     */
    public addNewCathedra(cathData: CmsCathedralReqDataModel): Observable<CmsCathedralResDataModel> {
        return this._http.post<CmsCathedralResDataModel>(
            this._endpoints.ADD_NEW_CATHEDRAL,
            cathData,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Dodawanie nowego kierunku (powiązanego z wydziałem) do bazy danych.
     */
    public addNewStudySpecialization(studyData: CmsStudySpecReqDataModel): Observable<Array<CmsStudySpecResDataModel>> {
        return this._http.post<Array<CmsStudySpecResDataModel>>(
            this._endpoints.ADD_STUDY_SPECIALIZATION,
            studyData,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Dodawanie nowego pokoju (powiązanego z katedrą i wydziałem).
     */
    public addNewStudyRoom(roomData: CmsStudyRoomReqDataModel): Observable<CmsStudyRoomResDataModel> {
        return this._http.post<CmsStudyRoomResDataModel>(
            this._endpoints.ADD_NEW_STUDY_ROOM,
            roomData,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Dodawanie nowego przedmiotu (powiązanego z wydziałem i kierunkiem studiów).
     */
    public addNewStudySubject(subjectData: CmsStudySubjectReqDataModel): Observable<CmsStudySubjectResDataModel> {
        return this._http.post<CmsStudySubjectResDataModel>(
            this._endpoints.ADD_NEW_STUDY_SUBJECT,
            subjectData,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Dodawanie nowej grupy dziekańskiej (powiązanego z wydziałem i kierunkiem studiów).
     */
    public addNewStudyGroup(groupData: CmsStudyGroupReqDataModel): Observable<Array<CmsStudyGroupResDataModel>> {
        return this._http.post<Array<CmsStudyGroupResDataModel>>(
            this._endpoints.ADD_NEW_STUDY_GROUP,
            groupData,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Dodawanie nowej aktywności do wybranego planu zajęć (na podstawie parametrów w ciele zapytania).
     */
    public addNewScheduleActivity(reqData: CmsScheduleActivityReqModel): Observable<ResponseServerMessageModel> {
        return this._http.post<ResponseServerMessageModel>(
            this._endpoints.ADD_SCHEDULE_ACTIVITY,
            reqData,
        );
    };
}