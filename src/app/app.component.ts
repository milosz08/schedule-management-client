/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: app.component.ts
 * Last modified | Ostatnia modyfikacja: 05/04/2022, 23:55
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

import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppGlobalState } from './ngrx-store/combine-reducers';
import { userAutoLogin } from './ngrx-store/session-ngrx-store/session.actions';

import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';

/**
 * Komponent główny (automatyczne logowanie, uruchamia sekwencerów mierzenia czasu sesji użytkownika).
 */

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    public constructor(
        private _store: Store<AppGlobalState>,
        private _authService: AuthService,
        private _sequencerService: SessionService,
        ) {
    };

    public ngOnInit(): void {
        this._store.dispatch(userAutoLogin());
        this._sequencerService.refreshSession();
    };

    @HostListener('document:click', ['$event'])
    public handlerFunction(e: MouseEvent) {
        this._sequencerService.invokeRefreshSession(e);
    };
}