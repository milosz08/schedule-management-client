/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: shared.effects.ts
 * Last modified | Ostatnia modyfikacja: 30/04/2022, 17:50
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
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { map, tap, withLatestFrom } from 'rxjs';

import * as NgrxAction_SHA from '../shared.actions';
import { SHARED_REDUCER, SharedReducerType } from '../shared.selectors';
import { RememberScheduleDataModel } from '../ngrx-models/remember-schedule-data.model';

import { RememberScheduleLocalStorageService } from '../../../services/remember-schedule-local-storage.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis efektów dla obsługi dziedziczonego ngrx stora (dla całej aplikacji).
 */

@Injectable()
export class SharedEffects {

    public constructor(
        private _router: Router,
        private _actions$: Actions,
        private _route: ActivatedRoute,
        private _store: Store<SharedReducerType>,
        private _storageService: RememberScheduleLocalStorageService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiany podczas wywoływania zapytania do stora do ustawiania kontentu leniwego ładowania.
     * Przy uruchomionym leniwym ładowaniu dodaje klasę uniemożliwiającą scrollowanie strony.
     */
    public disablePageScrollOnSuspense$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SHA.__setSuspenseLoader),
            tap(action => {
                if (action.status) {
                    document.body.classList.add('app--disable-scroll');
                } else {
                    document.body.classList.remove('app--disable-scroll');
                }
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt opóźniający włączenie/wyłączenie planszy ładowania kontentu. Domyślnie opóźnia o wartość 1 sekundy.
     * Można jednka to zmienić poprzez parametry akcji.
     */
    public suspenseLoaderDelay$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SHA.__setSuspenseLoaderDelay),
            tap(action => {
                setTimeout(() => {
                    this._store.dispatch(NgrxAction_SHA.__setSuspenseLoader({ status: action.status }));
                }, action.delayInSeconds ? action.delayInSeconds * 1000 : 1000);
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący dodanie nowego zapamiętanego planu zajęć. Metoda nie dodaje duplikatów oraz maksymalna ilość
     * dodanych elementów to 5. Jeśli dojdzie do próby dodania kolejnego elementu, zastąpi on element ostatni.
     */
    public addNewRememberContent = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SHA.__addNewScheduleData),
            withLatestFrom(this._store.select(SHARED_REDUCER)),
            map(([ action, store ]) => {
                const headerData = action.scheduleData.scheduleHeaderData;
                const headerFormat = action.scheduleData.scheduleHeaderData
                    .substring(headerData.indexOf('-') + 2, headerData.indexOf(','));
                const scheduleData = new RememberScheduleDataModel(headerFormat, action.param,
                    this._route.snapshot.queryParams);
                let allScheduleData = store.allRememberScheduleData;
                const findDuplicats = allScheduleData.find(el => el.scheduleName === headerFormat);
                if (!Boolean(findDuplicats)) {
                    if (allScheduleData.length < 5) {
                        allScheduleData = [ ...allScheduleData, scheduleData ];
                    } else {
                        const removeLastElement = allScheduleData.filter((_, idx) => idx !== 4);
                        allScheduleData = [ ...removeLastElement, scheduleData ];
                    }
                }
                if (store.ifInitialLoad) {
                    allScheduleData = this._storageService.getScheduleRememberLinks();
                } else {
                    this._storageService.updateScheduleRememberLinks(allScheduleData);
                }
                return NgrxAction_SHA.__successUpdateScheduleData({ rememberScheduleData: allScheduleData });
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący usunięcie wybranego zapamiętanego planu zajęć na podstawie nazwy grupy/sali/nauczyciela.
     * Efekt usuwa również zawartość z local storage przy pomocy wyspecjalizowanego serwisu.
     */
    public handleRemoveRememberContent = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SHA.__removeSelectedScheduleData),
            withLatestFrom(this._store.select(SHARED_REDUCER)),
            map(([ action, store ]) => {
                const scheduleData = store.allRememberScheduleData;
                const updatedData = scheduleData.filter(data => data.scheduleName !== action.scheduleName);
                this._storageService.updateScheduleRememberLinks(updatedData);
                this._router.navigate([ '/schedule' ]).then(r => r);
                return NgrxAction_SHA.__successUpdateScheduleData({ rememberScheduleData: updatedData });
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inicjalizujący początkowe pobranie zapisanych planów z mechanizmu local storage i umieszczenie ich w
     * ngrx storze aplikacji.
     */
    public handleInitialLoadScheduleData = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SHA.__initialLoadScheduleData),
            map(() => {
                const rememberScheduleData = this._storageService.getScheduleRememberLinks();
                return NgrxAction_SHA.__successUpdateScheduleData({ rememberScheduleData });
            }),
        );
    });
}