/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: first-change-password-page.component.ts
 * Last modified | Ostatnia modyfikacja: 30/04/2022, 22:35
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
import { Meta, Title } from '@angular/platform-browser';

import { AllMainWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

import * as NgrxAction_FCP from '../../ngrx-store/first-change-password-ngrx-store/first-change-password.actions';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Widok odpowiadający za generowanie strony początkowej zmiany hasła systemowego.
 */

@Component({
    selector: 'app-first-change-password-page',
    templateUrl: './first-change-password-page.component.html',
    styleUrls: [ './first-change-password-page.component.scss' ],
})
export class FirstChangePasswordPageComponent extends MetaWebContentHelper {

    public constructor(
        titleService: Title,
        metaService: Meta,
        private _store: Store,
    ) {
        super(titleService, metaService, AllMainWebpages.FIRST_CHANGE_PASSWORD);
    };

    //------------------------------------------------------------------------------------------------------------------

    public handleDisableShowThisPageAgain(pageVisibility: boolean): void {
        this._store.dispatch(NgrxAction_FCP.__toggleChangePasswordPageVisible({ pageVisibility }));
    };
}