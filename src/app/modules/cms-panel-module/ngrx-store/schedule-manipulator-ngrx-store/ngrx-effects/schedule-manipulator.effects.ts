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

import { catchError, delay, map, mergeMap, of, tap } from 'rxjs';

import * as NgrxAction_SMA from '../schedule-manipulator.actions';
import { PostDataReducerType } from '../../post-data-ngrx-store/post-data.selectors';

import { CmsScheduleConnectorService } from '../../../services/cms-schedule-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa efektów odpowiedzialnych za zarządzanie encjami i podencjami elementu edytora planu zajęć.
 */

@Injectable()
export class ScheduleManipulatorEffects {

    public constructor(
        private _router: Router,
        private _action$: Actions,
        private _store: Store<PostDataReducerType>,
        private _scheduleConnectorService: CmsScheduleConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inizalizujący konwersję parametrów wartości string na wartości ID z bazy danych.
     */
    public convertScheduleData$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_SMA.__convertScheduleData),
            mergeMap(action => {
                return this._scheduleConnectorService.convertScheduleParameters(action.schedData).pipe(
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
     * Efekt uruchamiany po pomyślnej procedurze konwersji nazw na numery id i przekierowujący na stronę z planem.
     */
    public redirectToSchedulePage$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_SMA.__successConvertScheduleData),
            tap(({ schedData }) => {
                this._router.navigate([ '/secure/panel/choose-schedule/schedule' ], {
                    queryParams: {
                        deptId: schedData.deptId,
                        specId: schedData.studySpecId,
                        groupId: schedData.studyGroupId,
                    }}).then(r => r);
            }),
        )

    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający efekt leniwego ładowania danych z serwera na wszystkich efektach wywołujących
     * pobieranie danych z serwera/umieszczanie danych na serwerze w tej klasie efektów.
     */
    public turnOffSuspenseLoading$ = createEffect(() => {
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