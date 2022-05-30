/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: modals.reducer.ts
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

import { createReducer, on } from '@ngrx/store';

import * as NgrxAction from './modals.actions';
import { initialModalsState } from './modals.initial';

//----------------------------------------------------------------------------------------------------------------------

const _modalsReducer = createReducer(
    initialModalsState,
    on(NgrxAction.__sessionSetModalVisibility, (state, action) => {
        return { ...state,
            sessionEndModalVisibility: action.modalVisibility,
        };
    }),
    on(NgrxAction.__scheduleSubjectDetailsModalVisibility, (state, action) => {
        return { ...state,
            scheduleSubjectDetailsModalVisibility: action.modalVisibility,
            selectedSubjectId: action.selectedSubjectId || null,
        };
    }),
    on(NgrxAction.__logoutModalSetVisibility, (state, action) => {
        return { ...state,
            logoutModalVisibility: action.modalVisibility,
        };
    }),
    on(NgrxAction.__openRemoveContentModal, (state, action) => {
        return { ...state,
            deleteContentModal: { ...state.deleteContentModal,
                removeContentPath: action.removeContentPath,
                removeContentIds: action.removeContentIds || [],
                modalVisibility: true,
            },
        };
    }),
    on(NgrxAction.__successRemoveContentModal, state => {
        return { ...state,
            deleteContentModal: { ...state.deleteContentModal,
                removeServerMessage: {
                    message: 'Usunięto poprawnie wybrane elementy z bazy danych. Możesz zamknąć okno.',
                    ifError: false,
                },
            },
        };
    }),
    on(NgrxAction.__failureRemoveContentModal, (state, action) => {
        return { ...state,
            deleteContentModal: { ...state.deleteContentModal,
                removeServerMessage: {
                    message: action.errorMessage || '',
                    ifError: true,
                },
            },
        };
    }),
    on(NgrxAction.__closeRemoveContentModal, state => {
        return { ...state,
            deleteContentModal: { ...state.deleteContentModal,
                removeContentPath: '',
                removeContentIds: [],
                modalVisibility: false,
                removeServerMessage: {
                    message: '',
                    ifError: false,
                },
            },
        };
    }),
    on(NgrxAction.__setSuspenseRemovingContentModal, (state, action) => {
        return { ...state,
            deleteContentModal: { ...state.deleteContentModal,
                suspenseRemovingContent: action.visibility,
            },
        };
    }),
    on(NgrxAction.__clearServerMessageRemoveContentModal, state => {
        return { ...state,
            deleteContentModal: { ...state.deleteContentModal,
                removeServerMessage: {
                    message: '',
                    ifError: false,
                },
            },
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export function modalsReducer(state: any, action: any) {
    return _modalsReducer(state, action);
}