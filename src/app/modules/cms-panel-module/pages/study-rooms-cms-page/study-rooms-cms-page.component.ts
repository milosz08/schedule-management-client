/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: study-rooms-cms-page.component.ts
 * Last modified | Ostatnia modyfikacja: 16/05/2022, 13:24
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

import { AllCmsWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie strony wyświetlającej tabelę ze wszystkimi salami zajęciowymi.
 */

@Component({
    selector: 'app-study-rooms-cms-page',
    templateUrl: './study-rooms-cms-page.component.html',
    styleUrls: [],
})
export class StudyRoomsCmsPageComponent extends MetaWebContentHelper {

    public constructor(
        titleService: Title,
        metaService: Meta,
    ) {
        super(titleService, metaService, AllCmsWebpages.STUDY_ROOMS);
    };
}