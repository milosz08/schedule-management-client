/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: last-logins.component.ts
 * Last modified | Ostatnia modyfikacja: 21/04/2022, 22:59
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

import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { RememberAccountModel } from '../../../../models/remember-account.model';

import * as NgrxAction_REM from '../../ngrx-store/remember-user-ngrx-store/remember-user.actions';
import * as NgrxSelector_REM from '../../ngrx-store/remember-user-ngrx-store/remember-user.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku ostatnio zalogowanych użytkowników.
 */

@Component({
    selector: 'app-last-logins',
    templateUrl: './last-logins.component.html',
    styleUrls: [ './last-logins.component.scss' ]
})
export class LastLoginsComponent implements OnInit {

    public _getAllSavedAccounts$: Observable<Array<RememberAccountModel>> = this._store
        .select(NgrxSelector_REM.sel_allSavedAccounts);

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store,
        private _sanitizer: DomSanitizer,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void { // automatyczne ładowanie zapisanych kont
        this._store.dispatch(NgrxAction_REM.__loadAllAccounts());
    };

    public handleRemoveAllSavedAccounts(): void {
        this._getAllSavedAccounts$.subscribe(savedAccounts => {
            if (savedAccounts.length > 0) {
                this._store.dispatch(NgrxAction_REM.__removeAllSavedAccounts());
            }
        }).unsubscribe();
    };

    public handleRemoveSelectedSavedAccount(userId: string): void {
        this._store.dispatch(NgrxAction_REM.__removeSingleSavedAccount({ userId }));
    };

    public handleAutoFilledLoginFormElement(emailValue: string): void {
        this._store.dispatch(NgrxAction_REM.__setAutoFilledEmail({ emailValue }));
    };

    public createUserIdentity(nameAndSurname: string): string {
        const [ name, surname ] = nameAndSurname.split(' ');
        return name.charAt(0) + surname.charAt(0);
    };

    public createUserInfoOnHover(user: RememberAccountModel): string {
        return `Użytkownik: ${user.nameWithSurname}\nAdres email: ${user.email}\nRola w systemie: ${user.role}`;
    };

    public getSaveImageURL(imageUrl: string): SafeUrl {
        return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
    };
}