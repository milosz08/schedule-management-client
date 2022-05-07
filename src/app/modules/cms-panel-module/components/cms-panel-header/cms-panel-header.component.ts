/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-panel-header.component.ts
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
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { MiscHelper } from '../../../../utils/misc.helper';
import { UserIdentityType } from '../../../../types/user-identity.type';

import * as NgrxSelector_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie widoku nagłówka panelu cms
 */

@Component({
    selector: 'app-cms-panel-header',
    templateUrl: './cms-panel-header.component.html',
    styleUrls: [ './cms-panel-header.component.scss' ]
})
export class CmsPanelHeaderComponent {

    public _userRole$: Observable<UserIdentityType> = this._store.select(NgrxSelector_SES.sel_userRole);

    public constructor(
        private _store: Store<SessionReducerType>,
    ) {
    }

    public getUserRoleSingleClass(role: UserIdentityType): string {
        return MiscHelper.createUserRoleSingleLetter(role).class;
    };
}