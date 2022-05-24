/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: choose-schedule-cms-page.component.ts
 * Last modified | Ostatnia modyfikacja: 24/05/2022, 10:38
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
import { Meta, Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { UserIdentityType } from '../../../../types/user-identity.type';
import { AllCmsWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

import * as NgrxSelector_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import * as NgrxSelector_SMA from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.selectors';
import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import { ScheduleManipulatorReducerType } from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.selectors';

import { CmsGetQueryConnectorService } from '../../services/cms-get-query-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie widoku formularzy (dla administratora i moderatora) z możliwością wybrania
 * grupy planu zajęć do edycji.
 */

@Component({
    selector: 'app-choose-schedule-cms-page',
    templateUrl: './choose-schedule-cms-page.component.html',
    styleUrls: [ './choose-schedule-cms-page.component.scss' ],
    host: { class: 'app__main-flex-columned' },
    providers: [ CmsGetQueryConnectorService ],
})
export class ChooseScheduleCmsPageComponent extends MetaWebContentHelper {

    public _userRole$: Observable<UserIdentityType> = this._store.select(NgrxSelector_SES.sel_userIdentity);
    public _isFetching$: Observable<boolean> = this._store.select(NgrxSelector_SMA.sel_isDataFetching);

    public _userIdentifier: typeof UserIdentityType = UserIdentityType;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        titleService: Title,
        metaService: Meta,
        private _store: Store<SessionReducerType | ScheduleManipulatorReducerType>,
        private _serviceGET: CmsGetQueryConnectorService,
    ) {
        super(titleService, metaService, AllCmsWebpages.CHOOSE_SCHEDULE);
    };
}