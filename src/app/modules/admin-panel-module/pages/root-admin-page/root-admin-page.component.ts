/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: root-admin-page.component.ts
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

import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AllAdminWebpages, MetaWebContent } from '../../../../utils/MetaWebContent';

import { UserLogin } from '../../../../store/actions/session.actions';
import { SessionStateKeysTypes } from '../../../../store/types/session.types';
import { InitialSessionStateTypes, sessionSelectSelector } from '../../../../store/initial-state/session.initial';


@Component({
    selector: 'app-root-admin-page',
    templateUrl: './root-admin-page.component.html',
    styleUrls: [ './root-admin-page.component.scss' ]
})
export class RootAdminPageComponent extends MetaWebContent {

    public ifLogged$?: Observable<boolean>;

    constructor(
        titleService: Title,
        metaService: Meta,
        private store: Store<InitialSessionStateTypes>,
        private router: Router
    ) {
        super(titleService, metaService, AllAdminWebpages.DASHBOARD);
        this.ifLogged$ = this.store.pipe(select(sessionSelectSelector(SessionStateKeysTypes.IF_LOGGED)));
    };

    public logout(): void {
        this.store.dispatch(new UserLogin({ ifLogged: false }));
        this.router.navigate([ 'login' ]).then(r => r);
    };
}