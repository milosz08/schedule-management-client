/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: post-data.reducer.ts
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

import { createReducer, on } from '@ngrx/store';

import * as NgrxAction from './post-data.actions';
import { initialPostDataState } from './post-data.initial';

//----------------------------------------------------------------------------------------------------------------------

const _postDataReducer = createReducer(
    initialPostDataState,
    on(NgrxAction.__successRegisterNewUser, (state, action) => {
        return { ...state,
            registerNewUserData: action.userData,
            ifFetching: false,
        };
    }),
    on(NgrxAction.__successAddNewDepartment, (state, action) => {
        return { ...state,
            addNewDepartmentData: action.deptData,
            ifFetching: false,
        };
    }),
    on(NgrxAction.__successAddNewCathedral, (state, action) => {
        return { ...state,
            addNewCathedralData: action.cathData,
            ifFetching: false,
        };
    }),
    on(NgrxAction.__successAddNewStudySpecialization, (state, action) => {
        return { ...state,
            addNewStudySpecialization: action.studyData,
            ifFetching: false,
        };
    }),
    on(NgrxAction.__successAddNewStudyRoom, (state, action) => {
        return { ...state,
            addNewStudyRoom: action.roomData,
            ifFetching: false,
        };
    }),
    on(NgrxAction.__successAddNewStudySubject, (state, action) => {
        return { ...state,
            addNewStudySubject: action.subjectData,
            ifFetching: false,
        };
    }),
    on(NgrxAction.__clearAllPostData, state => {
        return { ...state,
            registerNewUserData: null,
            addNewDepartmentData: null,
            addNewCathedralData: null,
            addNewStudySpecialization: null,
            addNewStudyRoom: null,
            addNewStudySubject: null,
            ifFetching: false,
            serverError: '',
        };
    }),
    on(NgrxAction.__failureAddNewContent, (state, action) => {
        return { ...state,
            serverError: action.failureMess,
            ifFetching: false,
        };
    }),
    on(NgrxAction.__setFetchingNewContent, state => {
        return { ...state,
            ifFetching: true,
        };
    }),
    on(NgrxAction.__clearNewContentServerError, state => {
        return { ...state,
            serverError: '',
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export function postDataReducer(state: any, action: any) {
    return _postDataReducer(state, action);
}