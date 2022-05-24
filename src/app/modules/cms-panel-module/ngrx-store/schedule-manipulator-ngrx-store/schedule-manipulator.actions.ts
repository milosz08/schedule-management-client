/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-manipulator.actions.ts
 * Last modified | Ostatnia modyfikacja: 24/05/2022, 21:37
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

import { CmsScheduleConvertReqDataModel, CmsScheduleConvertResDataModel } from '../../models/cms-schedule-convert-data.model';

//----------------------------------------------------------------------------------------------------------------------

export const CONVERT_SCHEDULE_DATA = '[SCHEDULE MANIPULATOR] CONVERT SCHEDULE DATA';
export const SUCCESS_CONVERT_SCHEDULE_DATA = '[SCHEDULE MANIPULATOR] SUCCESS CONVERT SCHEDULE DATA';
export const FAILURE_CONVERT_SCHEDULE_DATA = '[SCHEDULE MANIPULATOR] FAILURE CONVERT SCHEDULE DATA';
export const CLEAR_CONVERT_SCHEDULE_DATA = '[SCHEDULE MANIPULATOR] CLEAR CONVERT SCHEDULE DATA';

export const SET_FETCHING_NEW_CONTENT = '[SCHEDULE MANIPULATOR] SET FETCHING NEW CONTENT';
export const CLEAR_SERVER_ERROR_MESSAGE = '[SCHEDULE MANIPULATOR] CLEAR SERVER ERROR MESSAGE';

//----------------------------------------------------------------------------------------------------------------------

export const __convertScheduleData = createAction(
    CONVERT_SCHEDULE_DATA,
    props<{ schedData: CmsScheduleConvertReqDataModel }>(),
);

export const __successConvertScheduleData = createAction(
    SUCCESS_CONVERT_SCHEDULE_DATA,
    props<{ schedData: CmsScheduleConvertResDataModel }>(),
);

export const __failureConvertScheduleData = createAction(
    FAILURE_CONVERT_SCHEDULE_DATA,
    props<{ serverMess: string }>(),
);

export const __setFetchingNewContent = createAction(
    SET_FETCHING_NEW_CONTENT,
);

export const __clearConvertScheduleData = createAction(
    CLEAR_CONVERT_SCHEDULE_DATA,
);

export const __clearServerErrorMessage = createAction(
    CLEAR_SERVER_ERROR_MESSAGE,
);