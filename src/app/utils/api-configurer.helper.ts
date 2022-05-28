/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: api-configurer.helper.ts
 * Last modified | Ostatnia modyfikacja: 25/04/2022, 00:18
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
import { environment } from '../../environments/environment';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa przechowujący dane statyczne dla łączenia się z backendem.
 */

@Injectable({
    providedIn: 'root',
})
export class ApiConfigurerHelper {

    private static readonly API_PREFIX = environment.backendApi + '/api/v1/dotnet/';

    public readonly LOGIN_USER = ApiConfigurerHelper.API_PREFIX + 'auth/login';
    public readonly REGISTER_USER = ApiConfigurerHelper.API_PREFIX + 'auth/register';
    public readonly GET_REFRESH_TOKEN = ApiConfigurerHelper.API_PREFIX + 'auth/refresh-token';
    public readonly CHANGE_DEFAULT_PASSWORD = ApiConfigurerHelper.API_PREFIX + 'auth/change-password';
    public readonly RESET_PASSWORD_VIA_TOKEN = ApiConfigurerHelper.API_PREFIX + 'auth/reset-password';
    public readonly RESET_PASSWORD_VALIDATE_TOKEN = ApiConfigurerHelper.API_PREFIX + 'auth/confirm-reset-password';
    public readonly RESET_PASSWORD_SEND_TOKEN_VIA_EMAIL = ApiConfigurerHelper.API_PREFIX + 'auth/reset-password-email';

    public readonly DELETE_USER = ApiConfigurerHelper.API_PREFIX + 'users/delete';
    public readonly CMS_FILTERED_ALL_USERS = ApiConfigurerHelper.API_PREFIX + 'users/all-users';
    public readonly MASSIVE_DELETE_USERS = ApiConfigurerHelper.API_PREFIX + 'users/delete-massive';
    public readonly GET_ALL_EMPLOYEERS_SCHEDULE = ApiConfigurerHelper.API_PREFIX + 'users/all-employeers-schedule';
    public readonly GET_ALL_TEACHERS_BASE_DEPT_AND_SUBJ = ApiConfigurerHelper.API_PREFIX + 'users/all-teachers-base-dept-and-subj';

    public readonly GET_USER_IMAGE = ApiConfigurerHelper.API_PREFIX + 'file/get-avatar';

    public readonly AVAILABLE_PAGINATIONS = ApiConfigurerHelper.API_PREFIX + 'helper/available-paginations';
    public readonly GET_AVAILABLE_ROOM_TYPES = ApiConfigurerHelper.API_PREFIX + 'helper/available-room-types';
    public readonly GET_AVAILABLE_STUDY_TYPES = ApiConfigurerHelper.API_PREFIX  + 'helper/available-study-types';
    public readonly GET_AVAILABLE_STUDY_DEGREES = ApiConfigurerHelper.API_PREFIX + 'helper/available-study-degrees';
    public readonly GET_AVAILABLE_ROLES = ApiConfigurerHelper.API_PREFIX + 'helper/available-roles';
    public readonly GET_AVAILABLE_STUDY_SPECS_BASE_DEPT = ApiConfigurerHelper.API_PREFIX + 'helper/available-study-specs-base-dept';
    public readonly GET_AVAILABLE_SUBJECTS_BASE_DEPT = ApiConfigurerHelper.API_PREFIX + 'helper/available-subjects-base-dept';
    public readonly GET_AVAILABLE_SEMESTERS = ApiConfigurerHelper.API_PREFIX + 'helper/available-semesters';
    public readonly GET_AVAILABLE_SEM_BASE_STUDY_GROUP = ApiConfigurerHelper.API_PREFIX + 'helper/available-sem-base-study-group';
    public readonly GET_AVAIALBLE_DEGREES_BASE_STUDY_SPEC = ApiConfigurerHelper.API_PREFIX + 'helper/available-degrees-base-study-spec';
    public readonly CONVERT_SCHEDULE_DATA_NAMES_TO_IDS = ApiConfigurerHelper.API_PREFIX + 'helper/convert-schedule-data-from-names-to-ids';
    public readonly CONVERT_SCHEDULE_DATA_IDS_TO_NAMES = ApiConfigurerHelper.API_PREFIX + 'helper/convert-schedule-data-from-ids-to-names';
    public readonly GET_AVAILABLE_SUBJECT_TYPES = ApiConfigurerHelper.API_PREFIX + 'helper/available-subject-types';

    public readonly DELETE_DEPT = ApiConfigurerHelper.API_PREFIX + 'departments/delete';
    public readonly ADD_NEW_DEPARTMENT = ApiConfigurerHelper.API_PREFIX + 'departments/add-department';
    public readonly MASSIVE_DELETE_DEPTS = ApiConfigurerHelper.API_PREFIX + 'departments/delete-massive';
    public readonly CMS_FILTERED_ALL_DEPTS = ApiConfigurerHelper.API_PREFIX + 'departments/all-departments';
    public readonly GET_ALL_DEPARTMENTS_LIST = ApiConfigurerHelper.API_PREFIX + 'departments/all-departments-list';
    public readonly GET_ALL_DEPARTMENTS_SCHEDULE = ApiConfigurerHelper.API_PREFIX + 'departments/all-departments-schedule';

    public readonly DELETE_CATH = ApiConfigurerHelper.API_PREFIX + 'cathedrals/delete';
    public readonly ADD_NEW_CATHEDRAL = ApiConfigurerHelper.API_PREFIX + 'cathedrals/add-cathedral';
    public readonly MASSIVE_DELETE_CATH = ApiConfigurerHelper.API_PREFIX + 'cathedrals/delete-massive';
    public readonly CMS_FILTERED_ALL_CATHEDRALS = ApiConfigurerHelper.API_PREFIX + 'cathedrals/all-cathedrals';
    public readonly GET_ALL_CATHEDRALS_BASED_DEPARTMENT = ApiConfigurerHelper.API_PREFIX + 'cathedrals/all-cathedrals-dept';
    public readonly GET_ALL_CATHEDRALS_SCHEDULE = ApiConfigurerHelper.API_PREFIX + 'cathedrals/all-cathedrals-schedule';

    public readonly DELETE_STUDY_SPEC = ApiConfigurerHelper.API_PREFIX + 'studyspec/delete';
    public readonly ADD_STUDY_SPECIALIZATION = ApiConfigurerHelper.API_PREFIX + 'studyspec/add-study-spec';
    public readonly MASSIVE_DELETE_STUDY_SPECS = ApiConfigurerHelper.API_PREFIX + 'studyspec/delete-massive';
    public readonly CMS_FILTERED_ALL_STUDY_SPECS = ApiConfigurerHelper.API_PREFIX + 'studyspec/all-study-specs';
    public readonly GET_ALL_STUDY_SPEC_BASED_DEPARTMENT = ApiConfigurerHelper.API_PREFIX + 'studyspec/all-study-specs-dept';
    public readonly GET_ALL_STUDY_SPEC_SCHEDULE = ApiConfigurerHelper.API_PREFIX + 'studyspec/all-study-specs-schedule';

    public readonly DELETE_ROOM = ApiConfigurerHelper.API_PREFIX + 'studyrooms/delete';
    public readonly ADD_NEW_STUDY_ROOM = ApiConfigurerHelper.API_PREFIX + 'studyrooms/add-study-room';
    public readonly MASSIVE_DELETE_ROOMS = ApiConfigurerHelper.API_PREFIX + 'studyrooms/delete-massive';
    public readonly CMS_FILTERED_ALL_STUDY_ROOMS = ApiConfigurerHelper.API_PREFIX + 'studyrooms/all-study-rooms';
    public readonly GET_ALL_STUDY_ROOMS_SCHEDULE = ApiConfigurerHelper.API_PREFIX + 'studyrooms/all-study-rooms-schedule';
    public readonly GET_ALL_STUDY_ROOMS_BASE_DEPT = ApiConfigurerHelper.API_PREFIX + 'studyrooms/all-study-rooms-base-dept';

    public readonly DELETE_STUDY_SUBJECT = ApiConfigurerHelper.API_PREFIX + 'studysubject/delete';
    public readonly ADD_NEW_STUDY_SUBJECT = ApiConfigurerHelper.API_PREFIX + 'studysubject/add-study-subject';
    public readonly MASSIVE_DELETE_STUDY_SUBJECTS = ApiConfigurerHelper.API_PREFIX + 'studysubject/delete-massive';
    public readonly CMS_FILTERED_ALL_STUDY_SUBJECTS = ApiConfigurerHelper.API_PREFIX + 'studysubject/all-study-subjects';
    public readonly GET_ALL_STUDY_SUBJECTs_BASE_DEPT = ApiConfigurerHelper.API_PREFIX + 'studysubject/all-study-subjects-dept';

    public readonly DELETE_STUDY_GROUPS = ApiConfigurerHelper.API_PREFIX + 'studygroup/delete';
    public readonly ADD_NEW_STUDY_GROUP = ApiConfigurerHelper.API_PREFIX + 'studygroup/add-study-group';
    public readonly MASSIVE_DELETE_STUDY_GROUPS = ApiConfigurerHelper.API_PREFIX + 'studygroup/delete-massive';
    public readonly CMS_FILTERED_ALL_STUDY_GROUPS = ApiConfigurerHelper.API_PREFIX + 'studygroup/all-study-groups';
    public readonly GET_AVAILABLE_GROUPS_BASE_SPEC_AND_SEM = ApiConfigurerHelper.API_PREFIX + 'studygroup/available-groups-base-study-spec-and-sem';
    public readonly GET_AVAILABLE_GROUPS_BASE_SPEC = ApiConfigurerHelper.API_PREFIX + 'studygroup/available-groups-base-study-spec';

    public readonly ADD_SCHEDULE_ACTIVITY = ApiConfigurerHelper.API_PREFIX + 'schedulesubjects/add-new-schedule-activity';
    public readonly GET_SCHEDULE_SUBJECTS_BASE_GROUP_ID = ApiConfigurerHelper.API_PREFIX + 'schedulesubjects/all-schedule-subjects-base-group';
    public readonly GET_SCHEDULE_SUBJECTS_BASE_TEACHER_ID = ApiConfigurerHelper.API_PREFIX + 'schedulesubjects/all-schedule-subjects-base-teacher';
    public readonly GET_SCHEDULE_SUBJECTS_BASE_ROOM_ID = ApiConfigurerHelper.API_PREFIX + 'schedulesubjects/all-schedule-subjects-base-room';

    public readonly GET_WEEKSDATA_BASE_CURR_YEAR = ApiConfigurerHelper.API_PREFIX + 'timemanagement/all-weeks-data-base-curr-year';
}