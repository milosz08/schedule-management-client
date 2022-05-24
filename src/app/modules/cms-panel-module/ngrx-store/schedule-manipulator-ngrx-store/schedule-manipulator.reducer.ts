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

//----------------------------------------------------------------------------------------------------------------------

const _scheduleManipulatorReducer = createReducer(
    initialScheduleManipulatorState,
    on(NgrxAction.__successConvertScheduleData, (state, action) => {
        return { ...state,
            selectedGroupData: action.schedData,
            ifFetching: false,
        };
    }),
    on(NgrxAction.__failureConvertScheduleData, (state, action) => {
        return { ...state,
            serverErrorMessage: action.serverMess,
            ifFetching: false,
        };
    }),
    on(NgrxAction.__setFetchingNewContent, state => {
        return { ...state,
            ifFetching: true,
        };
    }),
    on(NgrxAction.__clearConvertScheduleData, state => {
        return { ...state,
            selectedGroupData: null,
        };
    }),
    on(NgrxAction.__clearServerErrorMessage, state => {
        return { ...state,
            serverErrorMessage: '',
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export function scheduleManipulatorReducer(state: any, action: any) {
    return _scheduleManipulatorReducer(state, action);
}