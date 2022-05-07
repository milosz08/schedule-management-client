/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-panel-footer.component.ts
 * Last modified | Ostatnia modyfikacja: 06/05/2022, 22:48
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
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { MiscHelper } from '../../../../utils/misc.helper';
import MainPageNavigationMockedData from '../../../../mocked-data/main-page-navigation-content.json';
import AuthorizationNavigationContent from '../../../../mocked-data/authorization-navigation-content.json';

import { UserIdentityType } from '../../../../types/user-identity.type';
import { MainNavigationModel } from '../../../main-page-module/models/main-navigation.model';

import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import * as NgrxSelector_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie widoku stopki panelu cms.
 */

@Component({
    selector: 'app-cms-panel-footer',
    templateUrl: './cms-panel-footer.component.html',
    styleUrls: [ './cms-panel-footer.component.scss' ]
})
export class CmsPanelFooterComponent {

    public _userNameWithSurname$: Observable<string> = this._store.select(NgrxSelector_SES.sel_userHeaderName);
    public _userLogin$: Observable<string> = this._store.select(NgrxSelector_SES.sel_userLogin);
    public _userRole$: Observable<UserIdentityType> = this._store.select(NgrxSelector_SES.sel_userRole);

    public readonly _navigationData: MainNavigationModel[];
    public readonly _authNavigationData: MainNavigationModel[];
    public _latestDatePipe: string;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _datePipe: DatePipe,
        private _store: Store<SessionReducerType>,
    ) {
        this._navigationData = MainPageNavigationMockedData;
        this._authNavigationData = AuthorizationNavigationContent;
        this._latestDatePipe = this._datePipe.transform(new Date(), 'yyyy')!;
    };

    //------------------------------------------------------------------------------------------------------------------

    public getUserRoleAfterConvert(role: UserIdentityType): string {
        return MiscHelper.convertEngToPlUserRole(role);
    };
}