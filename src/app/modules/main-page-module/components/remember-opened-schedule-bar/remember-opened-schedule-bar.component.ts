/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: remember-opened-schedule-bar.component.ts
 * Last modified | Ostatnia modyfikacja: 01/06/2022, 18:45
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as NgrxAction_SHA from '../../../shared-module/ngrx-store/shared-ngrx-store/shared.actions';
import * as NgrxSelector_SHA from '../../../shared-module/ngrx-store/shared-ngrx-store/shared.selectors';
import { SharedReducerType } from '../../../shared-module/ngrx-store/shared-ngrx-store/shared.selectors';
import { RememberScheduleDataModel } from '../../../shared-module/ngrx-store/shared-ngrx-store/ngrx-models/remember-schedule-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku nawigacji ostatnio zapamiętanych planów zajęć. Umożliwia również
 * usunięcie zapisanego planu zajęć z local storage.
 */

@Component({
    selector: 'app-remember-opened-schedule-bar',
    templateUrl: './remember-opened-schedule-bar.component.html',
    styleUrls: [ './remember-opened-schedule-bar.component.scss' ]
})
export class RememberOpenedScheduleBarComponent {

    public _rememberScheduleData$: Observable<Array<RememberScheduleDataModel>> = this._store
        .select(NgrxSelector_SHA.sel_rememberScheduleDataLinks);

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _router: Router,
        private _store: Store<SharedReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public handleRemoveRememberElement(e: Event, scheduleName: string): void {
        e.preventDefault();
        e.stopPropagation();
        this._store.dispatch(NgrxAction_SHA.__removeSelectedScheduleData({ scheduleName }));
    };
}