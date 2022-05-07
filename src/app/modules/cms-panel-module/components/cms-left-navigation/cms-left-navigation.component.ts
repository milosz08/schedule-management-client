/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-left-navigation.component.ts
 * Last modified | Ostatnia modyfikacja: 07/05/2022, 13:52
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
import { fadeInOutAnimation } from '../../../../animations/fade-animations';

import { UserIdentityType } from '../../../../types/user-identity.type';
import CmsPanelNavigation from '../../../../mocked-data/cms-panel-navigation.json';
import { CmsPanelNavigationDataModel } from '../../models/cms-panel-navigation-data.model';

import * as NgrxSelector_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import * as NgrxSelector_DOM from '../../ngrx-store/dom-manipulation-ngrx-store/dom-manipulation.selectors';

import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import { DomManipulatorReducerType } from '../../ngrx-store/dom-manipulation-ngrx-store/dom-manipulation.selectors';

//----------------------------------------------------------------------------------------------------------------------

type ComputedStores = SessionReducerType | DomManipulatorReducerType;

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku paska nawigacyjnego w panelu cms (po lewej stronie).
 */

@Component({
    selector: 'app-cms-left-navigation',
    templateUrl: './cms-left-navigation.component.html',
    styleUrls: [ './cms-left-navigation.component.scss' ],
    animations: [ fadeInOutAnimation ],
})
export class CmsLeftNavigationComponent {

    private _navigationAllData: CmsPanelNavigationDataModel[];

    public _userRole$: Observable<UserIdentityType> = this._store.select(NgrxSelector_SES.sel_userRole);
    public _ifNavVisible$: Observable<boolean> = this._store.select(NgrxSelector_DOM.sel_leftNavVisibility);

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<ComputedStores>,
    ) {
        this._navigationAllData = CmsPanelNavigation;
    };

    //------------------------------------------------------------------------------------------------------------------

    public getUserLinksBasedRole(role: UserIdentityType): CmsPanelNavigationDataModel[] {
        return this._navigationAllData.filter(el => el.availableFor.includes(role as string));
    };
}