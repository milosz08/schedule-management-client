/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: post-data.initial.ts
 * Last modified | Ostatnia modyfikacja: 11/05/2022, 20:27
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

import { CmsRegisterResDataModel } from './ngrx-models/cms-register-req-res-data.model';
import { CmsStudySpecResDataModel } from './ngrx-models/cms-study-spec-req-res-data.model';
import { CmsStudyRoomResDataModel } from './ngrx-models/cms-study-room-req-res-data.model';
import { CmsCathedralResDataModel } from './ngrx-models/cms-cathedral-req-res-data.model';
import { CmsDepartmentReqResDataModel } from './ngrx-models/cms-department-req-res-data.model';
import { CmsStudySubjectResDataModel } from './ngrx-models/cms-study-subject-req-res-data.model';
import { CmsStudyGroupResDataModel } from './ngrx-models/cms-study-group-req-res-data.model';

//----------------------------------------------------------------------------------------------------------------------

export interface InitialPostDataStateTypes {
    registerNewUserData: CmsRegisterResDataModel | null;
    addNewDepartmentData: CmsDepartmentReqResDataModel | null;
    addNewCathedralData: CmsCathedralResDataModel | null;
    addNewStudySpecialization: Array<CmsStudySpecResDataModel> | null;
    addNewStudyRoom: CmsStudyRoomResDataModel | null;
    addNewStudySubject: CmsStudySubjectResDataModel | null;
    addNewStudyGroup: Array<CmsStudyGroupResDataModel> | null;
    ifFetching: boolean;
    serverError: string;
}

//----------------------------------------------------------------------------------------------------------------------

export const initialPostDataState: InitialPostDataStateTypes = {
    registerNewUserData: null,
    addNewDepartmentData: null,
    addNewCathedralData: null,
    addNewStudySpecialization: null,
    addNewStudyRoom: null,
    addNewStudySubject: null,
    addNewStudyGroup: null,
    ifFetching: false,
    serverError: '',
};