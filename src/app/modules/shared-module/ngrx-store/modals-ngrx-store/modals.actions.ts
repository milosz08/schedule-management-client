/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: modals.actions.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 17:35
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

import { UserCredentialsType } from '../../../../types/user-credentials.type';

//----------------------------------------------------------------------------------------------------------------------

export const SET_END_SESSION_MODAL_VISIBILITY = '[MODALS] SET END SESSION MODAL VISIBILITY';
export const SET_SCHEDULE_SUBJECT_DETAILS_MODAL_VISIBILITY = '[MODALS] SET SCHEDULE SUBJECT DETAILS MODAL VISIBILITY';
export const SET_LOGOUT_MODAL_VISIBILITY = '[MODALS] SET LOGOUT MODAL VISIBILITY';
export const OPEN_REMOVE_CONTENT_MODAL = '[MODALS] OPEN REMOVE CONTENT MODAL';
export const REMOVE_CONTENT_MODAL = '[MODALS] REMOVE CONTENT MODAL';
export const SUCCESS_REMOVE_CONTENT = '[MODALS] SUCCESS REMOVE CONTENT';
export const FAILURE_REMOVE_CONTENT = '[MODALS] FAILURE REMOVE CONTENT';
export const CLOSE_REMOVE_CONTENT_MODAL = '[MODALS] CLOSE REMOVE CONTENT MODAL';
export const SET_SUSPENSE_REMOVING_CONTENT_MODAL = '[MODALS] SET SUSPENSE REMOVING CONTENT MODAL';
export const CLEAR_SERVER_MESSAGE_REMOVE_CONTENT_MODAL = '[MODALS] CLEAR SERVER MESSAGE REMOVE CONTENT MODAL';

//----------------------------------------------------------------------------------------------------------------------

export const __sessionSetModalVisibility = createAction(
    SET_END_SESSION_MODAL_VISIBILITY,
    props<{ modalVisibility: boolean }>(),
);

export const __scheduleSubjectDetailsModalVisibility = createAction(
    SET_SCHEDULE_SUBJECT_DETAILS_MODAL_VISIBILITY,
    props<{ modalVisibility: boolean, selectedSubjectId?: number | null }>(),
);

export const __logoutModalSetVisibility = createAction(
    SET_LOGOUT_MODAL_VISIBILITY,
    props<{ modalVisibility: boolean }>(),
);

export const __openRemoveContentModal = createAction(
    OPEN_REMOVE_CONTENT_MODAL,
    props<{ removeContentPath: string, removeContentIds?: Array<number> }>(),
);

export const __removeContentModal = createAction(
    REMOVE_CONTENT_MODAL,
    props<{ credentials: UserCredentialsType }>(),
);

export const __successRemoveContentModal = createAction(
    SUCCESS_REMOVE_CONTENT,
);

export const __failureRemoveContentModal = createAction(
    FAILURE_REMOVE_CONTENT,
    props<{ errorMessage?: string }>(),
);

export const __closeRemoveContentModal = createAction(
    CLOSE_REMOVE_CONTENT_MODAL,
);

export const __setSuspenseRemovingContentModal = createAction(
    SET_SUSPENSE_REMOVING_CONTENT_MODAL,
    props<{ visibility: boolean }>(),
);

export const __clearServerMessageRemoveContentModal = createAction(
    CLEAR_SERVER_MESSAGE_REMOVE_CONTENT_MODAL,
);