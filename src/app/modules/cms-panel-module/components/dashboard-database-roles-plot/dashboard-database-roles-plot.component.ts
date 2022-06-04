/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: dashboard-database-roles-plot.component.ts
 * Last modified | Ostatnia modyfikacja: 03/06/2022, 21:51
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

import { AfterViewInit, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { UserIdentityType } from '../../../../types/user-identity.type';
import { DashboardDetailsDataModel } from '../../models/dashboard-details-data.model';

import * as NgrxSelector_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadającyh za renderowanie widoku wykresu kołowego ze wszystkimi rolami.
 */

@Component({
    selector: 'app-dashboard-database-roles-plot',
    templateUrl: './dashboard-database-roles-plot.component.html',
    styleUrls: [],
})
export class DashboardDatabaseRolesPlotComponent implements AfterViewInit {

    public _userIdentity$: Observable<UserIdentityType> = this._store.select(NgrxSelector_SES.sel_userIdentity);
    public _identity: typeof UserIdentityType = UserIdentityType;

    @Input() public _dashboardDetailsData!: DashboardDetailsDataModel;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<SessionReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngAfterViewInit(): void {
        const allElements = document.querySelectorAll('.users-circles___svg') as NodeListOf<SVGAElement>;
        let prevSize: number = 0;
        [ ...allElements ].reverse().forEach((el, idx) => {
            const dataObject = this._dashboardDetailsData.dashboardUserTypesCount;
            const percentage =  dataObject[Object.keys(dataObject)[idx]];
            const percentageValue = 100.00 * percentage / dataObject.allElements;
            el.style.strokeDasharray = `calc(${percentageValue + prevSize} * (3.1416 * 42px) / 100) calc(3.1416 * 42px)`;
            prevSize += percentageValue;
        });
    };
}