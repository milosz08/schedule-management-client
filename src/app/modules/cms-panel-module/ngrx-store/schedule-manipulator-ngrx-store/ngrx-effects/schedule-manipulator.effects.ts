/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-manipulator.effects.ts
 * Last modified | Ostatnia modyfikacja: 24/05/2022, 21:36
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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { catchError, delay, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';

import * as NgrxAction_SMA from '../schedule-manipulator.actions';

import { HelpersConnectorService } from '../../../services/helpers-connector.service';
import { CmsPostConnectorService } from '../../../services/cms-post-connector.service';
import { CmsScheduleActivityReqModel } from '../ngrx-models/cms-schedule-activity-req.model';
import { SCHEDULE_MANIPULATOR_REDUCER, ScheduleManipulatorReducerType } from '../schedule-manipulator.selectors';

import { SuspenseService } from '../../../../shared-module/services/suspense.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa efektów odpowiedzialnych za zarządzanie encjami i podencjami elementu edytora planu zajęć.
 */

@Injectable()
export class ScheduleManipulatorEffects {

    public constructor(
        private _router: Router,
        private _action$: Actions,
        private _suspenseService: SuspenseService,
        private _store: Store<ScheduleManipulatorReducerType>,
        private _postConnectorService: CmsPostConnectorService,
        private _helperConnectorService: HelpersConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inizalizujący konwersję parametrów wartości string na wartości name oraz id z bazy danych.
     */
    public convertScheduleData$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_SMA.__convertScheduleData),
            mergeMap(action => {
                return this._helperConnectorService.convertScheduleParameters(action.schedData).pipe(
                    delay(500),
                    map(data => {
                        return NgrxAction_SMA.__successConvertScheduleData({ schedData: data });
                    }),
                    catchError(({ error }) => {
                        if (error) {
                            return of(NgrxAction_SMA.__failureConvertScheduleData({ serverMess: error.message }));
                        }
                        return of(NgrxAction_SMA.__failureConvertScheduleData({
                            serverMess: 'Nastąpił problem z konwersją wartości. Spróbuj ponownie.' }));
                    }),
                );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inizalizujący konwersję parametrów wartości id na wartości name oraz id z bazy danych.
     */
    public convertScheduleDataOnSchedulePage$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_SMA.__convertScheduleDataReversed),
            mergeMap(action => {
                return this._helperConnectorService.convertScheduleParametersReverse(action.schedData).pipe(
                    map(data => {
                        return NgrxAction_SMA.__successConvertScheduleData({ schedData: data });
                    }),
                    catchError(({ error }) => {
                        if (error) {
                            return of(NgrxAction_SMA.__failureConvertScheduleData({ serverMess: error.message }));
                        }
                        return of(NgrxAction_SMA.__failureConvertScheduleData({
                            serverMess: 'Nastąpił problem z konwersją wartości. Spróbuj ponownie.' }));
                    }),
                );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicializujący dodanie nowej aktywności do wybranej grupy dziekańskiej.
     */
    public addNewScheduleActivity$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_SMA.__addNewScheduleActivity),
            delay(500), // opóźnienie w celu zniwelowania efektu stroboskopowego
            withLatestFrom(this._store.select(SCHEDULE_MANIPULATOR_REDUCER)),
            mergeMap(([ action, state ]) => {
                const reqData = new CmsScheduleActivityReqModel(
                    action.activityData, state.selectedDay!.id, state.selectedGroupData!);
                return this._postConnectorService.addNewScheduleActivity(reqData).pipe(
                    map(() => {
                        this._store.dispatch(NgrxAction_SMA.__setAddingNewContentState({ ifAdding: false }));
                        this._suspenseService.reloadAngularPageWithRouter();
                        return NgrxAction_SMA.__successAddNewScheduleActivity()
                    }),
                    catchError(({ error }) => {
                        this._store.dispatch(NgrxAction_SMA.__setAddingNewContentState({ ifAdding: false }));
                        if (error) {
                            return of(NgrxAction_SMA.__failureAddNewScheduleActivity({ serverMess: error.message }));
                        }
                        return of(NgrxAction_SMA.__failureAddNewScheduleActivity({
                            serverMess: 'Nastąpił nieznany problem z próbą dodania nowej aktywności. ' +
                                'Spróbuj ponownie.' }));
                    }),
                );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiany po pomyślnej procedurze konwersji nazw na numery id i przekierowujący na stronę z planem.
     */
    public redirectToSchedulePage$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_SMA.__successConvertScheduleData),
            tap(({ schedData }) => {
                this._router.navigate([ '/secure/panel/choose-schedule/schedule' ], {
                    queryParams: {
                        deptId: schedData.deptData.id,
                        specId: schedData.studySpecData.id,
                        groupId: schedData.studyGroupData.id,
                    }}).then(r => r);
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający efekt leniwego ładowania danych z serwera na wszystkich efektach wywołujących
     * pobieranie danych z serwera/umieszczanie danych na serwerze w tej klasie efektów.
     */
    public turnOnSuspenseLoading$ = createEffect(() => {
        return this._action$.pipe(
            ofType(
                NgrxAction_SMA.__convertScheduleData,
            ),
            tap(() => {
                this._store.dispatch(NgrxAction_SMA.__setFetchingNewContent());
            }),
        );
    }, { dispatch: false });
}