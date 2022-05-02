/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: login-form.component.ts
 * Last modified | Ostatnia modyfikacja: 21/04/2022, 23:00
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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import { SavedUsersEffects } from '../../ngrx-store/remember-user-ngrx-store/ngrx-effects/saved-users.effects';

import * as NgrxAction_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.actions';
import * as NgrxSelector_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import * as NgrxAction_REM from '../../ngrx-store/remember-user-ngrx-store/remember-user.actions';
import * as NgrxSelector_REM from '../../ngrx-store/remember-user-ngrx-store/remember-user.selectors';
import * as NgrxAction_SHA from '../../../shared-module/ngrx-store/shared-ngrx-store/shared.actions';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku formularza logowania oraz jego obsługę
 * przy pomocy AngularForms API.
 */

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: [ './login-form.component.scss' ]
})
export class LoginFormComponent implements OnInit, OnDestroy {

    public _disableAddingNewAccounts$: Observable<boolean> = this._store
        .select(NgrxSelector_REM.sel_disableAddingNewAccountsToSaved);

    public _getAutoFilledEmail$: Observable<string> = this._store.select(NgrxSelector_REM.sel_autoFilledEmail);

    public _saveAccountLabel: string = 'Zapamiętaj konto';
    public _outOfBoundSavedAccountsArray: string = `Możesz zapamiętać maksymalnie ${SavedUsersEffects.SAVED_MAX_USERS} kont`;

    public readonly _loginForm: FormGroup;
    public _ifPasswordVisibility: boolean = false;

    private _storeSubscription: Subscription | undefined;
    private readonly _autoFilledSubscription: Subscription | undefined;
    public _loginError: string = '';

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<SessionReducerType>,
    ) {
        this._loginForm = new FormGroup({
            login: new FormControl('', [ Validators.required ]),
            password: new FormControl('', [ Validators.required ]),
        });
        this._autoFilledSubscription = this._getAutoFilledEmail$.subscribe(emailValue => {
            this._loginForm.setValue({ ...this._loginForm.getRawValue(), login: emailValue });
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._store.dispatch(NgrxAction_REM.__toggleIfSaveAccount({ ifSaveAccount: true }));
        this._storeSubscription = this._store
            .select(NgrxSelector_SES.sel_loginError)
            .subscribe(loginError => this._loginError = loginError);
    };

    public ngOnDestroy(): void {
        this._storeSubscription!.unsubscribe();
        this._autoFilledSubscription!.unsubscribe();
    };

    public handleSubmitForm(): void {
        const { login, password } = this._loginForm.getRawValue();
        this._store.dispatch(NgrxAction_SHA.__setSuspenseLoader({ status: true }));
        this._store.dispatch(NgrxAction_SES.__login({ login, password }));
    };

    public handleChangePasswordVisibility(): void {
        if (this._loginForm.getRawValue().password !== '') {
            this._ifPasswordVisibility = !this._ifPasswordVisibility;
        }
    };

    public handleClearErrorMessage(): void {
        if (this._loginError !== '') {
            this._store.dispatch(NgrxAction_SES.__failureLogin({ errorMessage: '' }));
        }
    };

    public ifFieldHasErrors(fieldName: string): boolean {
        return this._loginForm.get(fieldName)!.touched && !this._loginForm.get(fieldName)!.valid;
    };

    public handleEventEmitter(value: boolean) {
        this._store.dispatch(NgrxAction_REM.__toggleIfSaveAccount({ ifSaveAccount: value }));
    };
}