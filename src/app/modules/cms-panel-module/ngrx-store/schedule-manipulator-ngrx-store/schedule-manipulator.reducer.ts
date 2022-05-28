/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-manipulator.reducer.ts
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

import { createReducer, on } from '@ngrx/store';

import * as NgrxAction from './schedule-manipulator.actions';
import { initialScheduleManipulatorState } from './schedule-manipulator.initial';
import { AvailableScheduleModalTypes } from '../../types/available-schedule-modal.types';

//----------------------------------------------------------------------------------------------------------------------

const _scheduleManipulatorReducer = createReducer(
    initialScheduleManipulatorState,
    on(NgrxAction.__successConvertScheduleData, (state, action) => {
        return { ...state,
            selectedGroupData: action.schedData,
            ifFetchingContent: false,
        };
    }),
    on(NgrxAction.__failureConvertScheduleData, (state, action) => {
        return { ...state,
            ifFetchingServerError: true,
            serverMessage: action.serverMess,
            ifFetchingContent: false,
        };
    }),
    on(NgrxAction.__setFetchingNewContent, state => {
        return { ...state,
            ifFetchingContent: true,
        };
    }),
    on(NgrxAction.__setAddingNewContentState, (state, action) => {
        return { ...state,
            ifAddingNewActivity: action.ifAdding,
        };
    }),
    on(NgrxAction.__clearConvertScheduleData, state => {
        return { ...state,
            selectedGroupData: null,
        };
    }),
    on(NgrxAction.__clearServerErrorMessage, state => {
        return { ...state,
            ifAddingServerError: false,
            ifFetchingServerError: false,
            serverMessage: '',
        };
    }),
    on(NgrxAction.__setModalOpen, (state, action) => {
        return { ...state,
            selectedDay: action.selectedDay,
            modalType: action.modalType,
            ifModalOpen: true,
        };
    }),
    on(NgrxAction.__setModalClose, state => {
        return { ...state,
            selectedDay: null,
            modalType: AvailableScheduleModalTypes.INITIAL,
            serverMessage: '',
            ifAddingServerError: false,
            ifFetchingServerError: false,
            ifModalOpen: false,
        };
    }),
    on(NgrxAction.__successAddNewScheduleActivity, state => {
        return { ...state,
            ifAddingNewActivity: false,
            modalType: AvailableScheduleModalTypes.INITIAL,
            ifModalOpen: false,
        };
    }),
    on(NgrxAction.__failureAddNewScheduleActivity, (state, action) => {
        return { ...state,
            ifAddingServerError: true,
            serverMessage: action.serverMess,
            ifAddingNewActivity: false,
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export function scheduleManipulatorReducer(state: any, action: any) {
    return _scheduleManipulatorReducer(state, action);
}