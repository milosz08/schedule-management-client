/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: end-session-modal.component.ts
 * Last modified | Ostatnia modyfikacja: 28/04/2022, 19:18
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
import { Store } from '@ngrx/store';

import { fadeInOutAnimation } from '../../../../animations/fade-animations';

import { InitialSessionStateTypes } from '../../../../ngrx-store/session-ngrx-store/session.initial';
import { getSessionEndModalVisibility } from '../../../../ngrx-store/session-ngrx-store/session.selectors';

import {
    userLogout, userRenewSession, userSessionSetModalVisibility
} from '../../../../ngrx-store/session-ngrx-store/session.actions';

/**
 *
 */

@Component({
    selector: 'app-end-session-modal',
    templateUrl: './end-session-modal.component.html',
    styleUrls: [ './end-session-modal.component.scss' ],
    animations: [ fadeInOutAnimation ]
})
export class EndSessionModalComponent {

    public _modalVisibility$ = this._store.select(getSessionEndModalVisibility);

    public constructor(
        private _store: Store<InitialSessionStateTypes>,
    ) {
    };

    public handleCloseModalAndRenewSession(): void {
        this._store.dispatch(userRenewSession());
    };

    public handleCloseModalAndLogoutUser(): void {
        this._store.dispatch(userSessionSetModalVisibility({ modalVisibility: false }));
        this._store.dispatch(userLogout());
    };
}