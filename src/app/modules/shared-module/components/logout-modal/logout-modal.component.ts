/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: logout-modal.component.ts
 * Last modified | Ostatnia modyfikacja: 29/04/2022, 16:45
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

import { InitialSessionStateTypes } from '../../../../ngrx-store/session-ngrx-store/session.initial';
import { getLogoutModalVisibility, } from '../../../../ngrx-store/session-ngrx-store/session.selectors';
import { userLogoutModalSetVisibility } from '../../../../ngrx-store/session-ngrx-store/session.actions';

import { fadeInOutAnimation } from '../../../../animations/fade-animations';
import { Router } from '@angular/router';


@Component({
    selector: 'app-logout-modal',
    templateUrl: './logout-modal.component.html',
    styleUrls: [ './logout-modal.component.scss' ],
    animations: [ fadeInOutAnimation ]
})
export class LogoutModalComponent {

    public _modalVisibility$ = this._store.select(getLogoutModalVisibility);

    public constructor(
        private _router: Router,
        private _store: Store<InitialSessionStateTypes>,
    ) {
    };

    public handleCloseModal(): void {
        this._store.dispatch(userLogoutModalSetVisibility({ modalVisibility: false }));
    };

    public handleCloseModalAndLoginAgain(): void {
        this.handleCloseModal();
        this._router.navigate([ '/auth/login' ]).then(r => r);
    };
}