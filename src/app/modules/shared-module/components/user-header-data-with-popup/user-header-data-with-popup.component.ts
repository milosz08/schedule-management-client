/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: user-header-data-with-popup.component.ts
 * Last modified | Ostatnia modyfikacja: 24/04/2022, 18:48
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
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { fadeInOutAnimation } from '../../../../animations/fade-animations';

import {
    getSessionSoonLogout, getUserDetailsPopupButtonTitle, getUserHeaderName, getUserSessionCurrentTime
} from '../../../../ngrx-store/session-ngrx-store/session.selectors';

import { AppGlobalState } from '../../../../ngrx-store/combine-reducers';
import { AuthResponseDataModel } from '../../../../ngrx-store/session-ngrx-store/ngrx-models/auth-response-data.model';

/**
 * Komponent odpowiadający za renderowanie widoku reprezentującego przycisk z danymi użytkownika (wraz z obsługiwaną
 * logiką tego przycisku - po kliknięciu otwarcie okna popup z większą ilością informacji) w headerze.
 */

@Component({
    selector: 'app-user-header-data-with-popup',
    templateUrl: './user-header-data-with-popup.component.html',
    styleUrls: [ './user-header-data-with-popup.component.scss' ],
    animations: [ fadeInOutAnimation ],
})
export class UserHeaderDataWithPopupComponent implements OnInit, OnDestroy {

    public _userDetailsButtonTitle$: Observable<string> = this._store.select(getUserDetailsPopupButtonTitle);
    public _ifSessionSoonLogout$: Observable<boolean> = this._store.select(getSessionSoonLogout);
    public _sessionLeftTime$: Observable<number> = this._store.select(getUserSessionCurrentTime);
    public _userHeaderName$: Observable<string> = this._store.select(getUserHeaderName);

    private _storeSubscription: Subscription | undefined;
    public _userData: AuthResponseDataModel | null = null;
    private _ifModalOpen: boolean = false;

    public constructor(
        private _router: Router,
        private _store: Store<AppGlobalState>,
    ) {
    };

    public ngOnInit(): void {
        this._storeSubscription = this._store
            .select(reducer => reducer.sessionReducer)
            .subscribe(({ userData, sessionLeftTime }) => this._userData = userData );
    };

    public ngOnDestroy(): void {
        if (this._storeSubscription) {
            this._storeSubscription.unsubscribe();
        }
    };

    public handleOpenUserDetailsPopup(): void {
        if (!Boolean(this._userData)) {
            this._router.navigate([ 'auth/login' ]).then(r => r);
        } else {
            this._ifModalOpen = !this._ifModalOpen;
        }
    };

    get __ifModalOpen(): boolean {
        return this._ifModalOpen && Boolean(this._userData);
    };
}