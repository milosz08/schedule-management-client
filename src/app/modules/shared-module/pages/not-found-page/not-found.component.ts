/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: not-found-page.component.ts
 * Last modified | Ostatnia modyfikacja: 09/04/2022, 14:46
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
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { AllMainWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent renderujący stronę błędu (404) w przypadku błędnego routingu lub
 * nieznalezienia zawartości.
 */

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found.component.html',
    styleUrls: [ './not-found.component.scss' ],
})
export class NotFoundPageComponent extends MetaWebContentHelper {

    public _ifIsOnCmsPage: boolean = false;

    public constructor(
        metaService: Meta,
        titleService: Title,
        private _router: Router,
    ) {
        super(titleService, metaService, AllMainWebpages.NOT_FOUND);
        this._ifIsOnCmsPage = this._router.url.includes('secure');
    };
}