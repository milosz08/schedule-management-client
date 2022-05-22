/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: edit-cathedral-cms-page.component.ts
 * Last modified | Ostatnia modyfikacja: 20/05/2022, 20:14
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
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { AllCmsWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za możliwość edycji wybranej katedry (na podstawie parametru ścieżki URL).
 */

@Component({
    selector: 'app-edit-cathedral-cms-page',
    templateUrl: './edit-cathedral-cms-page.component.html',
    styleUrls: [],
    host: { class: 'app__main-flex-columned' },
})
export class EditCathedralCmsPageComponent extends MetaWebContentHelper {

    public _editCathId: string | null = '';

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        titleService: Title,
        metaService: Meta,
        private _route: ActivatedRoute,
    ) {
        super(titleService, metaService, AllCmsWebpages.EDIT_CATHEDRAL);
        this._editCathId = this._route.snapshot.paramMap.get('cathId');
    };
}