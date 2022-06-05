/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: post-data.effects.ts
 * Last modified | Ostatnia modyfikacja: 11/05/2022, 20:28
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
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';

import * as NgrxAction_PDE from '../post-data.actions';
import * as NgrxAction_PDA from '../post-data.actions';
import { PostDataReducerType } from '../post-data.selectors';

import { CmsUserResDataModel } from '../ngrx-models/cms-register-req-res-data.model';
import { CmsPutConnectorService } from '../../../services/cms-put-connector.service';
import { CmsPostConnectorService } from '../../../services/cms-post-connector.service';
import { CmsCathedralResDataModel } from '../ngrx-models/cms-cathedral-req-res-data.model';
import { CmsStudySpecResDataModel } from '../ngrx-models/cms-study-spec-req-res-data.model';
import { CmsStudyRoomResDataModel } from '../ngrx-models/cms-study-room-req-res-data.model';
import { CmsDepartmentReqResDataModel } from '../ngrx-models/cms-department-req-res-data.model';
import { CmsStudySubjectResDataModel } from '../ngrx-models/cms-study-subject-req-res-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa efektów odpowiedzialnych za usługi typu POST oraz PUT dokonywane w panelu administratora.
 */

@Injectable()
export class PostPutDataEffects {

    public constructor(
        private _action$: Actions,
        private _store: Store<PostDataReducerType>,
        private _putConnectorService: CmsPutConnectorService,
        private _postConnectorService: CmsPostConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inizalizujący rejestrację nowego/edycję istniejącego użytkownika.
     */
    public registerNewUser$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__registerUpdateUser),
            mergeMap(action => {
                let observable: Observable<CmsUserResDataModel>;
                if (!action.userId) {
                    observable = this._postConnectorService.registerUser(action.userData);
                } else {
                    observable = this._putConnectorService
                        .updateUser(action.userData, action.userId!, action.ifUpdateEmailPass);
                }
                return observable.pipe(
                    map(data => {
                        return NgrxAction_PDE.__successRegisterUpdateUser({ userData: data });
                    }),
                    catchError(({ error }) => {
                        return PostPutDataEffects.handledServerExceptions(error, 'użytkownika');
                    }),
                );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący dodanie nowego/edycję istniejącego wydziału.
     */
    public addUpdateDepartment$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__addUpdateDepartment),
            mergeMap(action => {
                let observable: Observable<CmsDepartmentReqResDataModel>;
                if (!action.deptId) {
                    observable = this._postConnectorService.addNewDepartment(action.deptData);
                } else {
                    observable = this._putConnectorService.updateDepartment(action.deptData, action.deptId);
                }
                return observable.pipe(
                    map(data => {
                        return NgrxAction_PDE.__successAddUpdateDepartment({ deptData: data });
                    }),
                    catchError(({ error }) => {
                        return PostPutDataEffects.handledServerExceptions(error, 'wydziału');
                    }),
                );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący dodanie nowej/edycję istniejącej katedry do wydziału.
     */
    public addUpdateCathedral$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__addUpdateCathedral),
            mergeMap(action => {
                let observable: Observable<CmsCathedralResDataModel>;
                if (!action.cathId) {
                    observable = this._postConnectorService.addNewCathedral(action.cathData);
                } else {
                    observable = this._putConnectorService.updateCathedral(action.cathData, action.cathId);
                }
                return observable.pipe(
                    map(data => {
                        return NgrxAction_PDE.__successAddUpdateCathedral({ cathData: data });
                    }),
                    catchError(({ error }) => {
                        return PostPutDataEffects.handledServerExceptions(error, 'katedry');
                    }),
                );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący dodanie nowego/edycję istniejącego kierunku studiów do wydziału.
     */
    public addUpdateSpecialization$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__addUpdateStudySpec),
            mergeMap(action => {
                let observable: Observable<Array<CmsStudySpecResDataModel>>;
                if (!action.specId) {
                    observable = this._postConnectorService.addNewStudySpecialization(action.studyData);
                } else {
                    observable = this._putConnectorService.updateStudySpecialization(action.studyData, action.specId);
                }
                return observable.pipe(
                    map(data => {
                        return NgrxAction_PDE.__successAddUpdateStudySpecialization({ studyData: data });
                    }),
                    catchError(({ error }) => {
                        return PostPutDataEffects.handledServerExceptions(error, 'kierunku studiów');
                    }),
                );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący dodanie nowej/edycję istniejącej sali zajęciowej do wydziału.
     */
    public addUpdateStudyRoom$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__addUpdateStudyRoom),
            mergeMap(action => {
                let observable: Observable<CmsStudyRoomResDataModel>;
                if (!action.roomId) {
                    observable = this._postConnectorService.addNewStudyRoom(action.roomData);
                } else {
                    observable = this._putConnectorService.updateStudyRoom(action.roomData, action.roomId);
                }
                return observable.pipe(
                    map(data => {
                        return NgrxAction_PDE.__successAddUpdateStudyRoom({ roomData: data });
                    }),
                    catchError(({ error }) => {
                        return PostPutDataEffects.handledServerExceptions(error, 'sali zajęciowej');
                    }),
                )
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący dodanie nowego/edycję istniejącego przedmiotu do wybranego kierunku studiów.
     */
    public addUpdateStudySubject$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__addUpdateStudySubject),
            mergeMap(action => {
                let observable: Observable<CmsStudySubjectResDataModel>;
                if (!action.subjId) {
                    observable = this._postConnectorService.addNewStudySubject(action.subjectData);
                } else {
                    observable = this._putConnectorService.updateStudySubject(action.subjectData, action.subjId);
                }
                return observable.pipe(
                    map(data => {
                        return NgrxAction_PDE.__successAddUpdateStudySubject({ subjectData: data });
                    }),
                    catchError(({ error }) => {
                        return PostPutDataEffects.handledServerExceptions(error, 'przedmiotu');
                    }),
                )
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący dodanie nowej grupy dziekańskiej do wybranego kierunku studiów.
     */
    public addNewStudyGroup$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__addNewStudyGroup),
            mergeMap(action => {
                return this._postConnectorService.addNewStudyGroup(action.groupData).pipe(
                    map(data => {
                        return NgrxAction_PDE.__successAddNewStudyGroup({ groupData: data });
                    }),
                    catchError(({ error }) => {
                        return PostPutDataEffects.handledServerExceptions(error, 'grupy dziekańskej');
                    }),
                )
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Funkcja wyłapująca wyjątki z warstwy serwerowej i zwracająca obserwabla.
     */
    private static handledServerExceptions(error: any, message: string): Observable<any> {
        if (error) {
            return of(NgrxAction_PDE.__failureAddUpdateContent({ failureMess: error.message }));
        }
        return of(NgrxAction_PDE.__failureAddUpdateContent({
            failureMess: `Nastąpił problem z dodaniem/edycją ${message}. Spróbuj ponownie.` }));
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający efekt leniwego ładowania danych z serwera na wszystkich efektach wywołujących
     * umieszczanie elementów w bazie danych.
     */
    public turnOffSuspenseLoading$ = createEffect(() => {
        return this._action$.pipe(
            ofType(
                NgrxAction_PDE.__registerUpdateUser,
                NgrxAction_PDE.__addUpdateDepartment,
                NgrxAction_PDE.__addUpdateCathedral,
                NgrxAction_PDE.__addUpdateStudySpec,
                NgrxAction_PDE.__addUpdateStudyRoom,
                NgrxAction_PDE.__addUpdateStudySubject,
                NgrxAction_PDE.__addNewStudyGroup,
            ),
            tap(() => {
                this._store.dispatch(NgrxAction_PDA.__setFetchingNewContent());
            }),
        );
    }, { dispatch: false });
}