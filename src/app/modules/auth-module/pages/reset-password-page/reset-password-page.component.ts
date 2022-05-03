/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: reset-password-page.component.ts
 * Last modified | Ostatnia modyfikacja: 19/04/2022, 14:42
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
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AllMainWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

import * as NgrxSelector_RES from '../../ngrx-store/reset-password-ngrx-store/reset-password.selectors';
import { ResetPasswordReducerType } from '../../ngrx-store/reset-password-ngrx-store/reset-password.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Widok odpowiadający za generowanie strony umożliwiającej zmianę hasła.
 */

@Component({
    selector: 'app-reset-password-page',
    templateUrl: './reset-password-page.component.html',
    styleUrls: [ './reset-password-page.component.scss' ]
})
export class ResetPasswordPageComponent extends MetaWebContentHelper {

    public _ifPasswordNotSet$: Observable<boolean> = this._store.select(NgrxSelector_RES.sel_ifPasswordNotSet);
    public _successFormMessage$: Observable<string> = this._store.select(NgrxSelector_RES.sel_resetPasswordFormMessage);

    public _bearerTokenQueryParam: string | null = '';
    public _discardChangesForm: boolean = true;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        titleService: Title,
        metaService: Meta,
        private _route: ActivatedRoute,
        private _store: Store<ResetPasswordReducerType>,
    ) {
        super(titleService, metaService, AllMainWebpages.RESET_PASSWORD);
        this._bearerTokenQueryParam = this._route.snapshot.queryParamMap.get('token');
    };

    public setDiscardChangesForm(ifChanges: boolean): void {
        this._discardChangesForm = ifChanges;
    };
}