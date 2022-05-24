/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-cms-page.component.ts
 * Last modified | Ostatnia modyfikacja: 24/05/2022, 13:32
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { AllCmsWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku planu zajęć (z możliwością dodawania nowych treści).
 */

@Component({
    selector: 'app-schedule-cms-page',
    templateUrl: './schedule-cms-page.component.html',
    styleUrls: [ './schedule-cms-page.component.scss' ],
})
export class ScheduleCmsPageComponent extends MetaWebContentHelper implements OnInit, OnDestroy {

    public _deptIdParam: string | null = '';
    public _specIdParam: string | null = '';
    public _groupIdParam: string | null = '';

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        titleService: Title,
        metaService: Meta,
        private _route: ActivatedRoute,
    ) {
        super(titleService, metaService, AllCmsWebpages.SCHEDULE);
        this._deptIdParam = this._route.snapshot.queryParamMap.get('deptId');
        this._specIdParam = this._route.snapshot.queryParamMap.get('specId');
        this._groupIdParam = this._route.snapshot.queryParamMap.get('groupId');
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {

    };

    public ngOnDestroy(): void {

    };
}