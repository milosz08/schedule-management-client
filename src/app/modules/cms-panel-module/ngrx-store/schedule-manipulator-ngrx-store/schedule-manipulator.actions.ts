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

import { AvailableScheduleModalTypes } from '../../types/available-schedule-modal.types';

import {
    CmsScheduleConvertFromIdsReqDataModel, CmsScheduleConvertFromNamesReqDataModel, CmsScheduleConvertResDataModel
} from '../../models/cms-schedule-convert-data.model';

import { NameWithId } from '../../../../models/drop-lists-data.model';
import { CmsScheduleActivityFormModel } from './ngrx-models/cms-schedule-activity-req.model';

//----------------------------------------------------------------------------------------------------------------------

export const CONVERT_SCHEDULE_DATA = '[SCHEDULE MANIPULATOR] CONVERT SCHEDULE DATA';
export const CONVERT_SCHEDULE_DATA_REVERSE = '[SCHEDULE MANIPULATOR] CONVERT SCHEDULE DATA REVERSE';
export const SUCCESS_CONVERT_SCHEDULE_DATA = '[SCHEDULE MANIPULATOR] SUCCESS CONVERT SCHEDULE DATA';
export const FAILURE_CONVERT_SCHEDULE_DATA = '[SCHEDULE MANIPULATOR] FAILURE CONVERT SCHEDULE DATA';
export const CLEAR_CONVERT_SCHEDULE_DATA = '[SCHEDULE MANIPULATOR] CLEAR CONVERT SCHEDULE DATA';

export const ADD_NEW_SCHEDULE_ACTIVITY = '[SCHEDULE MANIPULATOR] ADD NEW SCHEDULE ACTIVITY';
export const SUCCESS_ADD_NEW_SCHEDULE_ACTIVITY = '[SCHEDULE MANIPULATOR] SUCCESS ADD NEW SCHEDULE ACTIVITY';
export const FAILURE_ADD_NEW_SCHEDULE_ACTIVITY = '[SCHEDULE MANIPULATOR] FAILURE ADD NEW SCHEDULE ACTIVITY';

export const SET_MODAL_OPEN = '[SCHEDULE MANIPULATOR] SET MODAL OPEN';
export const SET_MODAL_CLOSE = '[SCHEDULE MANIPULATOR] SET MODAL CLOSE';

export const SET_FETCHING_NEW_CONTENT = '[SCHEDULE MANIPULATOR] SET FETCHING NEW CONTENT';
export const SET_ADDING_NEW_CONTENT_STATE = '[SCHEDULE MANIPULATOR] SET ADDING NEW CONTENT STATE';
export const CLEAR_SERVER_ERROR_MESSAGE = '[SCHEDULE MANIPULATOR] CLEAR SERVER ERROR MESSAGE';

//----------------------------------------------------------------------------------------------------------------------

export const __convertScheduleData = createAction(
    CONVERT_SCHEDULE_DATA,
    props<{ schedData: CmsScheduleConvertFromNamesReqDataModel }>(),
);

export const __convertScheduleDataReversed = createAction(
    CONVERT_SCHEDULE_DATA_REVERSE,
    props<{ schedData: CmsScheduleConvertFromIdsReqDataModel }>(),
);

export const __successConvertScheduleData = createAction(
    SUCCESS_CONVERT_SCHEDULE_DATA,
    props<{ schedData: CmsScheduleConvertResDataModel }>(),
);

export const __failureConvertScheduleData = createAction(
    FAILURE_CONVERT_SCHEDULE_DATA,
    props<{ serverMess: string }>(),
);

//----------------------------------------------------------------------------------------------------------------------

export const __addNewScheduleActivity = createAction(
    ADD_NEW_SCHEDULE_ACTIVITY,
    props<{ activityData: CmsScheduleActivityFormModel }>(),
);

export const __successAddNewScheduleActivity = createAction(
    SUCCESS_ADD_NEW_SCHEDULE_ACTIVITY,
);

export const __failureAddNewScheduleActivity = createAction(
    FAILURE_ADD_NEW_SCHEDULE_ACTIVITY,
    props<{ serverMess: string }>(),
);

//----------------------------------------------------------------------------------------------------------------------

export const __setFetchingNewContent = createAction(
    SET_FETCHING_NEW_CONTENT,
);

export const __setAddingNewContentState = createAction(
    SET_ADDING_NEW_CONTENT_STATE,
    props<{ ifAdding: boolean }>(),
);

export const __clearConvertScheduleData = createAction(
    CLEAR_CONVERT_SCHEDULE_DATA,
);

export const __clearServerErrorMessage = createAction(
    CLEAR_SERVER_ERROR_MESSAGE,
);

//----------------------------------------------------------------------------------------------------------------------

export const __setModalOpen = createAction(
    SET_MODAL_OPEN,
    props<{ selectedDay: NameWithId, modalType: AvailableScheduleModalTypes }>(),
);

export const __setModalClose = createAction(
    SET_MODAL_CLOSE,
);