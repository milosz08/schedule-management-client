/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: user-details-popup.component.ts
 * Last modified | Ostatnia modyfikacja: 21/04/2022, 22:13
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

import { Observable } from 'rxjs';

import * as NgrxAction from '../../../../ngrx-store/session-ngrx-store/session.actions';
import * as NgrxSelector from '../../../../ngrx-store/session-ngrx-store/session.selectors';
import { InitialSessionStateTypes } from '../../../../ngrx-store/session-ngrx-store/session.initial';

/**
 * Komponent odpowiadający za renderowanie widoku okna z informacją o użytkowniku (w
 * headerze, po kliknięciu przycisku).
 */

@Component({
    selector: 'app-user-details-popup',
    templateUrl: './user-details-popup.component.html',
    styleUrls: [ './user-details-popup.component.scss' ]
})
export class UserDetailsPopupComponent {

    public _sessionLeftTime$: Observable<number> = this._store.select(NgrxSelector.getUserSessionCurrentTime);
    public _ifSessionSoonLogout$: Observable<boolean> = this._store.select(NgrxSelector.getSessionSoonLogout);
    public _userNameAndSurname$: Observable<string> = this._store.select(NgrxSelector.getUserHeaderName);
    public _userAuthLevel$: Observable<string> = this._store.select(NgrxSelector.getUserAuthLevel);
    public _userLogin$: Observable<string> = this._store.select(NgrxSelector.getUserLogin);

    public constructor(
        private _store: Store<InitialSessionStateTypes>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public handleUserLogout(): void {
        this._store.dispatch(NgrxAction.userLogout({ ifRedirectToRoot: true }));
        this._store.dispatch(NgrxAction.userLogoutModalSetVisibility({ modalVisibility: true }));
    };
}