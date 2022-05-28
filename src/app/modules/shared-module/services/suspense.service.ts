/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: suspense.service.ts
 * Last modified | Ostatnia modyfikacja: 25/04/2022, 00:35
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
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as NgrxAction_SHA from '../ngrx-store/shared-ngrx-store/shared.actions';
import { SharedReducerType } from '../ngrx-store/shared-ngrx-store/shared.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiedzialny za planszę odpalaną przy leniwym ładowaniu kontenntu.
 */

@Injectable()
export class SuspenseService {

    public constructor(
        private _router: Router,
        private _store: Store<SharedReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Uruchamianie planszy leniwego ładowania przy każdym nowym wczytywaniem podstrony.
     */
    public toggleSuspenseComponent(): void {
        this._router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart) {
                this._store.dispatch(NgrxAction_SHA.__setSuspenseLoader({ status: true }));
            } else if (event instanceof RouteConfigLoadEnd) {
                setTimeout(() => this._store.dispatch(NgrxAction_SHA.__setSuspenseLoader({ status: false })), 1000);
            }
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Przeładowanie leniwe strony na podstawie routingu angularRouter. Uwaga! Metoda nie przeładowuje całej strony
     * (ponowne wysłanie zapytania do serwera).
     */
    public reloadAngularPageWithRouter(): void {
        let currentUrl = this._router.url;
        this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this._router.navigateByUrl(currentUrl).then(r => r);
        });
    }
}