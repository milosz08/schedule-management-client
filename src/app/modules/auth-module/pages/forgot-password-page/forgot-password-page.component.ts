/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: forgot-password-page.component.ts
 * Last modified | Ostatnia modyfikacja: 19/04/2022, 14:42
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

import { AllMainWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

/**
 * Widok odpowiadający za generowanie strony umożliwiającej zmianę hasła.
 */

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: [ './forgot-password-page.component.scss' ]
})
export class ForgotPasswordPageComponent extends MetaWebContentHelper {

    constructor(
        titleService: Title,
        metaService: Meta,
    ) {
        super(titleService, metaService, AllMainWebpages.FORGOT_PASSWORD);
    };
}