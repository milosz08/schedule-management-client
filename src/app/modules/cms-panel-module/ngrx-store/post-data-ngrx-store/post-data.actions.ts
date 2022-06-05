/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: post-data.actions.ts
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

import { createAction, props } from '@ngrx/store';

import { CmsDepartmentReqResDataModel } from './ngrx-models/cms-department-req-res-data.model';
import { CmsAddUpdateReqDataModel, CmsUserResDataModel } from './ngrx-models/cms-register-req-res-data.model';
import { CmsCathedralReqDataModel, CmsCathedralResDataModel } from './ngrx-models/cms-cathedral-req-res-data.model';
import { CmsStudySpecReqDataModel, CmsStudySpecResDataModel } from './ngrx-models/cms-study-spec-req-res-data.model';
import { CmsStudyRoomReqDataModel, CmsStudyRoomResDataModel } from './ngrx-models/cms-study-room-req-res-data.model';
import { CmsStudyGroupReqDataModel, CmsStudyGroupResDataModel } from './ngrx-models/cms-study-group-req-res-data.model';
import { CmsStudySubjectReqDataModel, CmsStudySubjectResDataModel } from './ngrx-models/cms-study-subject-req-res-data.model';

//----------------------------------------------------------------------------------------------------------------------

export const REGISTER_NEW_USER = '[POST DATA] REGISTER NEW USER';
export const SUCCESS_REGISTER_NEW_USER = '[POST DATA] SUCCESS REGISTER NEW USER';
export const ADD_NEW_DEPARTMENT = '[POST DATA] ADD NEW DEPARTMENT';
export const SUCCESS_ADD_NEW_DEPARTMENT = '[POST DATA] SUCCESS ADD NEW DEPARTMENT';
export const ADD_NEW_CATHEDRAL = '[POST DATA] ADD NEW CATHEDRAL';
export const SUCCESS_ADD_NEW_CATHEDRAL = '[POST DATA] SUCCESS ADD NEW CATHEDRAL';
export const ADD_NEW_STUDY_SPECIALIZATION = '[POST DATA] ADD NEW STUDY SPECIALIZATION';
export const SUCCESS_ADD_NEW_STUDY_SPECIALIZATION = '[POST DATA] SUCCESS ADD NEW STUDY SPECIALIZATION';
export const ADD_NEW_STUDY_ROOM = '[POST DATA] ADD NEW STUDY ROOM';
export const SUCCESS_ADD_NEW_STUDY_ROOM = '[POST DATA] SUCCESS ADD NEW STUDY ROOM';
export const ADD_NEW_STUDY_SUBJECT = '[POST] ADD NEW STUDY SUBJECT';
export const SUCCESS_ADD_NEW_STUDY_SUBJECT = '[POST] SUCCESS ADD NEW STUDY SUBJECT';
export const ADD_NEW_STUDY_GROUP = '[POST] ADD NEW STUDY GROUP';
export const SUCCESS_ADD_NEW_STUDY_GROUP = '[POST] SUCCESS ADD NEW STUDY GROUP';

export const CLEAR_ALL_POST_DATA = '[POST DATA] CLEAR ALL POST DATA';
export const SET_FETCHING_NEW_CONTENT = '[POST DATA] SET FETCHING NEW CONTENT';
export const FAILURE_ADD_NEW_CONTENT = '[POST DATA] FAILURE ADD NEW DEPARTMENT';
export const CLEAR_NEW_CONTENT_SERVER_ERROR = '[POST DATA] CLEAR NEW CONTENT SERVER ERROR';

//----------------------------------------------------------------------------------------------------------------------

export const __registerUpdateUser = createAction(
    REGISTER_NEW_USER,
    props<{ userData: CmsAddUpdateReqDataModel, userId: number | null, ifUpdateEmailPass: boolean }>(),
);

export const __successRegisterUpdateUser = createAction(
    SUCCESS_REGISTER_NEW_USER,
    props<{ userData: CmsUserResDataModel }>(),
);

//----------------------------------------------------------------------------------------------------------------------

export const __addUpdateDepartment = createAction(
    ADD_NEW_DEPARTMENT,
    props<{ deptData: CmsDepartmentReqResDataModel, deptId: number | null }>(),
);

export const __successAddUpdateDepartment = createAction(
    SUCCESS_ADD_NEW_DEPARTMENT,
    props<{ deptData: CmsDepartmentReqResDataModel }>(),
);

//----------------------------------------------------------------------------------------------------------------------

export const __addUpdateCathedral = createAction(
    ADD_NEW_CATHEDRAL,
    props<{ cathData: CmsCathedralReqDataModel, cathId: number | null }>(),
);

export const __successAddUpdateCathedral = createAction(
    SUCCESS_ADD_NEW_CATHEDRAL,
    props<{ cathData: CmsCathedralResDataModel }>(),
);

//----------------------------------------------------------------------------------------------------------------------

export const __addUpdateStudySpec = createAction(
    ADD_NEW_STUDY_SPECIALIZATION,
    props<{ studyData: CmsStudySpecReqDataModel, specId: number | null }>(),
);

export const __successAddUpdateStudySpecialization = createAction(
    SUCCESS_ADD_NEW_STUDY_SPECIALIZATION,
    props<{ studyData: Array<CmsStudySpecResDataModel> }>(),
);

//----------------------------------------------------------------------------------------------------------------------

export const __addUpdateStudyRoom = createAction(
    ADD_NEW_STUDY_ROOM,
    props<{ roomData: CmsStudyRoomReqDataModel, roomId: number | null }>(),
);

export const __successAddUpdateStudyRoom = createAction(
    SUCCESS_ADD_NEW_STUDY_ROOM,
    props<{ roomData: CmsStudyRoomResDataModel }>(),
);

//----------------------------------------------------------------------------------------------------------------------

export const __addUpdateStudySubject = createAction(
    ADD_NEW_STUDY_SUBJECT,
    props<{ subjectData: CmsStudySubjectReqDataModel, subjId: number | null }>(),
);

export const __successAddUpdateStudySubject = createAction(
    SUCCESS_ADD_NEW_STUDY_SUBJECT,
    props<{ subjectData: CmsStudySubjectResDataModel }>(),
);

//----------------------------------------------------------------------------------------------------------------------

export const __addNewStudyGroup = createAction(
    ADD_NEW_STUDY_GROUP,
    props<{ groupData: CmsStudyGroupReqDataModel }>(),
);

export const __successAddNewStudyGroup = createAction(
    SUCCESS_ADD_NEW_STUDY_GROUP,
    props<{ groupData: Array<CmsStudyGroupResDataModel> }>(),
);

//----------------------------------------------------------------------------------------------------------------------

export const __clearAllPostData = createAction(
    CLEAR_ALL_POST_DATA,
);

export const __failureAddUpdateContent = createAction(
    FAILURE_ADD_NEW_CONTENT,
    props<{ failureMess: string }>(),
);

export const __setFetchingNewContent = createAction(
    SET_FETCHING_NEW_CONTENT,
);

export const __clearNewContentServerError = createAction(
    CLEAR_NEW_CONTENT_SERVER_ERROR,
);