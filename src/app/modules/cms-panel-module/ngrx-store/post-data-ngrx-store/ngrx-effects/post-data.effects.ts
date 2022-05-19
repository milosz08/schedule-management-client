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

import { CmsPostConnectorService } from '../../../services/cms-post-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa efektów odpowiedzialnych za usługi typu POST dokonywane w panelu administratora.
 */

@Injectable()
export class PostDataEffects {

    public constructor(
        private _action$: Actions,
        private _store: Store<PostDataReducerType>,
        private _postConnectorService: CmsPostConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inizalizujący rejestrację nowego użytkownika.
     */
    public registerNewUser$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__registerNewUser),
            mergeMap(action => {
                return this._postConnectorService.registerUser(action.userData).pipe(
                    map(data => {
                        return NgrxAction_PDE.__successRegisterNewUser({ userData: data });
                    }),
                    catchError(({ error }) => {
                        return PostDataEffects.handledServerExceptions(error, 'użytkownika');
                    }),
                );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący dodanie nowego wydziału.
     */
    public addNewDepartment$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__addNewDepartment),
            mergeMap(action => {
                return this._postConnectorService.addNewDepartment(action.deptData).pipe(
                    map(data => {
                        return NgrxAction_PDE.__successAddNewDepartment({ deptData: data });
                    }),
                    catchError(({ error }) => {
                        return PostDataEffects.handledServerExceptions(error, 'wydziału');
                    }),
                );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący dodanie nowej katedry do wydziału.
     */
    public addNewCathedral$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__addNewCathedral),
            mergeMap(action => {
                return this._postConnectorService.addNewCathedra(action.cathData).pipe(
                    map(data => {
                        return NgrxAction_PDE.__successAddNewCathedral({ cathData: data });
                    }),
                    catchError(({ error }) => {
                        return PostDataEffects.handledServerExceptions(error, 'katedry');
                    }),
                );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący dodanie nowego kierunku studiów do wydziału.
     */
    public addNewSpecialization$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__addNewStudySpec),
            mergeMap(action => {
                return this._postConnectorService.addNewStudySpecialization(action.studyData).pipe(
                    map(data => {
                        return NgrxAction_PDE.__successAddNewStudySpecialization({ studyData: data });
                    }),
                    catchError(({ error }) => {
                        return PostDataEffects.handledServerExceptions(error, 'kierunku studiów');
                    }),
                );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący dodanie nowej sali zajęciowej do wydziału.
     */
    public addNewStudyRoom$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__addNewStudyRoom),
            mergeMap(action => {
                return this._postConnectorService.addNewStudyRoom(action.roomData).pipe(
                    map(data => {
                        return NgrxAction_PDE.__successAddNewStudyRoom({ roomData: data });
                    }),
                    catchError(({ error }) => {
                        return PostDataEffects.handledServerExceptions(error, 'sali zajęciowej');
                    }),
                )
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący dodanie nowego przedmiotu do wybranego kierunku studiów.
     */
    public addNewStudySubject$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_PDE.__addNewStudySubject),
            mergeMap(action => {
                return this._postConnectorService.addNewStudySubject(action.subjectData).pipe(
                    map(data => {
                        return NgrxAction_PDE.__successAddNewStudySubject({ subjectData: data });
                    }),
                    catchError(({ error }) => {
                        return PostDataEffects.handledServerExceptions(error, 'przedmiotu');
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
            return of(NgrxAction_PDE.__failureAddNewContent({ failureMess: error.message }));
        }
        return of(NgrxAction_PDE.__failureAddNewContent({
            failureMess: `Problem z dodaniem ${message}. Spróbuj ponownie.` }));
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający efekt leniwego ładowania danych z serwera na wszystkich efektach wywołujących
     * umieszczanie elementów w bazie danych.
     */
    public turnOffSuspenseLoading$ = createEffect(() => {
        return this._action$.pipe(
            ofType(
                NgrxAction_PDE.__registerNewUser,
                NgrxAction_PDE.__addNewDepartment,
                NgrxAction_PDE.__addNewCathedral,
                NgrxAction_PDE.__addNewStudySpec,
                NgrxAction_PDE.__addNewStudyRoom,
                NgrxAction_PDE.__addNewStudySubject,
            ),
            tap(() => {
                this._store.dispatch(NgrxAction_PDA.__setFetchingNewContent());
            }),
        );
    }, { dispatch: false });
}