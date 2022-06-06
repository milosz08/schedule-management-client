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

import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as NgrxAction_MOD from '../../ngrx-store/modals-ngrx-store/modals.actions';
import * as NgrxAction_SES from '../../ngrx-store/session-ngrx-store/session.actions';
import * as NgrxSelector_SES from '../../ngrx-store/session-ngrx-store/session.selectors';
import { SessionReducerType } from '../../ngrx-store/session-ngrx-store/session.selectors';

//----------------------------------------------------------------------------------------------------------------------

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

    public _sessionLeftTime$: Observable<number> = this._store.select(NgrxSelector_SES.sel_userSessionCurrentTime);
    public _ifSessionSoonLogout$: Observable<boolean> = this._store.select(NgrxSelector_SES.sel_sessionSoonLogout);
    public _userNameAndSurname$: Observable<string> = this._store.select(NgrxSelector_SES.sel_userHeaderName);
    public _userAuthLevel$: Observable<string> = this._store.select(NgrxSelector_SES.sel_userAuthLevel);
    public _userLogin$: Observable<string> = this._store.select(NgrxSelector_SES.sel_userLogin);

    @Input() public _ifIsCmsPanel?: boolean = false;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<SessionReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public handleUserLogout(): void {
        this._store.dispatch(NgrxAction_SES.__logout({ ifRedirectToRoot: true }));
        this._store.dispatch(NgrxAction_MOD.__logoutModalSetVisibility({ modalVisibility: true }));
    };
}