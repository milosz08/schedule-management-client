/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: user-image.component.ts
 * Last modified | Ostatnia modyfikacja: 24/04/2022, 18:47
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
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import {
    getIfUserHasImage, getIfUserNotLogged, getUserImageURL, getUserInitials
} from '../../../../ngrx-store/session-ngrx-store/session.selectors';

import { InitialSessionStateTypes } from '../../../../ngrx-store/session-ngrx-store/session.initial';

/**
 * Komponent renderujący widok avataru użytkownika. Jeśli takowy nie znajduje się w storze, wygeneruje
 * podstawowy avatar składający się z inicjałów zalogowanego użytkownika. Jeśli użytkownik nie jest zalogowany
 * wyświetla podstawowe statyczne zdjęcie (tylko header).
 */

@Component({
    selector: 'app-user-image',
    templateUrl: './user-image.component.html',
    styleUrls: [ './user-image.component.scss' ]
})
export class UserImageComponent implements OnInit, OnDestroy {

    public _ifUserNotLogged$: Observable<boolean> = this._store.select(getIfUserNotLogged);
    public _ifUserHasImage$: Observable<boolean> = this._store.select(getIfUserHasImage);
    public _userInitials$: Observable<string> = this._store.select(getUserInitials);

    private _storeSubscription: Subscription | undefined;
    private _imageURL: string = '';

    constructor(
        private _store: Store<InitialSessionStateTypes>,
        private _sanitizer: DomSanitizer,
    ) {
    };

    public ngOnInit(): void {
        this._storeSubscription = this._store
            .select(getUserImageURL)
            .subscribe(imageURL => this._imageURL = imageURL);
    };

    public ngOnDestroy(): void {
        if (this._storeSubscription) {
            this._storeSubscription.unsubscribe();
        }
    };

    get __imageURL(): SafeUrl {
        return this._sanitizer.bypassSecurityTrustUrl(this._imageURL);
    };
}