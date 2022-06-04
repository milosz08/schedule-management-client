/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: dashboard-cms-page.component.ts
 * Last modified | Ostatnia modyfikacja: 09/04/2022, 17:23
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

import { Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { catchError, delay, map, of, Subject, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DashboardDetailsDataModel } from '../../models/dashboard-details-data.model';
import { AllCmsWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

import { CmsGetQueryConnectorService } from '../../services/cms-get-query-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Widok odpowiadający za generowanie strony głównej panelu cms.
 */

@Component({
    selector: 'app-dashboard-cms-page',
    templateUrl: './dashboard-cms-page.component.html',
    styleUrls: [ './dashboard-cms-page.component.scss' ],
    providers: [ CmsGetQueryConnectorService ],
})
export class DashboardCmsPageComponent extends MetaWebContentHelper implements OnDestroy {

    public _dashboardDetailsData!: DashboardDetailsDataModel;
    public _ifLoadingContent: boolean = true;
    public _ifServerError: boolean = false;

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        titleService: Title,
        metaService: Meta,
        private _serviceGET: CmsGetQueryConnectorService,
    ) {
        super(titleService, metaService, AllCmsWebpages.DASHBOARD);
        this._serviceGET.getDashboardUserData().pipe(
            take(1),
            takeUntil(this._unsubscribe),
            delay(500),
            map(data => {
                this._ifLoadingContent = false;
                return data;
            }),
            catchError(() => {
                this._ifLoadingContent = false;
                this._ifServerError = true;
                return of(null);
            }),
        ).subscribe(data => {
            this._dashboardDetailsData = data!;
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };
}