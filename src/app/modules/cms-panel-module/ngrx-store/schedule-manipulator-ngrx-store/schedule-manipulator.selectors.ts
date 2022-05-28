/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-manipulator.selectors.ts
 * Last modified | Ostatnia modyfikacja: 24/05/2022, 21:38
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

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InitialScheduleManipulatorStateTypes } from './schedule-manipulator.initial';
import { AvailableScheduleModalTypes } from '../../types/available-schedule-modal.types';

//----------------------------------------------------------------------------------------------------------------------

export const SCHEDULE_MANIPULATOR_REDUCER = 'scheduleManipulatorReducer' as const;
const getPostDataState = createFeatureSelector<InitialScheduleManipulatorStateTypes>(SCHEDULE_MANIPULATOR_REDUCER);

export type ScheduleManipulatorReducerType = { [SCHEDULE_MANIPULATOR_REDUCER]: InitialScheduleManipulatorStateTypes };

const selectorWithInjectedStore = (payload: (state: any, action?: any) => any) => (
    createSelector(getPostDataState, payload)
);

//----------------------------------------------------------------------------------------------------------------------

export const sel_isDataFetching = selectorWithInjectedStore(
    state => state.ifFetching,
);

export const sel_isDataAdding = selectorWithInjectedStore(
    state => state.ifAddingNewActivity,
);

export const sel_ifFetchingError = selectorWithInjectedStore(
    state => state.ifFetchingServerError ? state.serverMessage : '',
);

export const sel_ifAddingError = selectorWithInjectedStore(
    state => state.ifAddingServerError ? state.serverMessage : '',
);

export const sel_modalAddEditVisibilityState = selectorWithInjectedStore(
    state => state.ifModalOpen && (state.modalType === AvailableScheduleModalTypes.ADD ||
                                   state.modalType === AvailableScheduleModalTypes.EDIT),
);

export const sel_departmentAndStudySpecDataId = selectorWithInjectedStore(
    state => Boolean(state.selectedGroupData)
        ? { dept: state.selectedGroupData.deptData.id, spec: state.selectedGroupData.studySpecData.id }
        : { dept: null, spec: null },
);

export const sel_selectedDayToEdit = selectorWithInjectedStore(
    state => Boolean(state.selectedDay) ? state.selectedDay.name : '',
);