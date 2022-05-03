/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: send-token-via-email-page.component.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 12:43
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
import { Meta, Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AllMainWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

import * as NgrxAction from '../../ngrx-store/reset-password-ngrx-store/reset-password.actions';
import * as NgrxSelector from '../../ngrx-store/reset-password-ngrx-store/reset-password.selectors';

import { InitialSessionStateTypes } from '../../../shared-module/ngrx-store/session-ngrx-store/session.initial';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie strony umożliwiającej wysłanie tokenu resetującego hasło do systemu.
 */

@Component({
    selector: 'app-send-token-via-email-form-page',
    templateUrl: './send-token-via-email-page.component.html',
    styleUrls: [ './send-token-via-email-page.component.scss' ]
})
export class SendTokenViaEmailPageComponent extends MetaWebContentHelper implements OnInit {

    public _discardChangesEmail: boolean = true;
    public _discardChangesToken: boolean = true;

    public _tokenSuccessSend: Observable<boolean> = this._store.select(NgrxSelector.sel_ifTokenIsSuccessSend);
    public _tokenSuccessSendMessage: Observable<string> = this._store
        .select(NgrxSelector.sel_resetPasswordSendTokenMessage);

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        titleService: Title,
        metaService: Meta,
        private _store: Store<InitialSessionStateTypes>,
    ) {
        super(titleService, metaService, AllMainWebpages.RESET_PASSWORD);
    };

    //------------------------------------------------------------------------------------------------------------------

    public setDiscardChangesEmail(ifChanges: boolean): void {
        this._discardChangesEmail = ifChanges;
    };

    public setDiscardChangesToken(ifChanges: boolean): void {
        this._discardChangesToken = ifChanges;
    };

    public ngOnInit(): void {   // czyszczenie
        this._store.dispatch(NgrxAction.__resetTokenClearMessage());
        this._store.dispatch(NgrxAction.__resetValidateTokenClearMessage());
        this._store.dispatch(NgrxAction.__resetPasswordClearFormMessage());
    };
}