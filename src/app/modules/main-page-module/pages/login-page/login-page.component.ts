/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: login-page.component.ts
 * Last modified | Ostatnia modyfikacja: 09/04/2022, 15:57
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

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AllMainWebpages, WebTitle } from '../../../../utils/WebTitle';

import { UserLogout } from '../../../../store/actions/session.actions';
import { SessionStateKeysTypes } from '../../../../store/types/session.types';
import { InitialSessionStateTypes, sessionSelectSelector } from '../../../../store/initial-state/session.initial';


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: [ './login-page.component.scss' ],
})
export class LoginPageComponent {

    public ifLogged$?: Observable<boolean>;
    private webtitle: WebTitle = new WebTitle();

    constructor(
        private titleService: Title,
        private meta: Meta,
        private store: Store<InitialSessionStateTypes>,
        private router: Router
    ) {
        this.updateMetaTags();
        this.ifLogged$ = this.store.pipe(select(sessionSelectSelector(SessionStateKeysTypes.IF_LOGGED)));
    };

    private updateMetaTags(): void {
        this.titleService.setTitle(this.webtitle.combinePageTitleElements(AllMainWebpages.LOGIN));
        this.meta.updateTag({
            name: 'description',
            content: this.webtitle.combinePageDescriptionElements(AllMainWebpages.LOGIN)
        });
    };

    public login(): void {
        this.store.dispatch(new UserLogout({ ifLogged: true }));
        this.router.navigate([ '/secure/admin-panel/dashboard' ]).then(r => r);
    };
}