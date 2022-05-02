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

import * as NgrxAction from '../../../../ngrx-store/session-ngrx-store/session.actions';
import * as NgrxSelector from '../../../../ngrx-store/session-ngrx-store/session.selectors';

import { setSuspenseLoader } from '../../../../ngrx-store/shared-ngrx-store/shared.actions';
import { InitialSessionStateTypes } from '../../../../ngrx-store/session-ngrx-store/session.initial';
import { SavedUsersEffects } from '../../../../ngrx-store/session-ngrx-store/ngrx-effects/saved-users.effects';

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

    public _disableAddingNewAccounts$: Observable<boolean> = this._store.select(NgrxSelector.disableAddingNewAccountsToSaved);
    public _getAutoFilledEmail$: Observable<string> = this._store.select(NgrxSelector.getAutoFilledEmail);

    public _saveAccountLabel: string = 'Zapamiętaj konto';
    public _outOfBoundSavedAccountsArray: string = `Możesz zapamiętać maksymalnie ${SavedUsersEffects.SAVED_MAX_USERS} kont`;

    public readonly _loginForm: FormGroup;
    public _ifPasswordVisibility: boolean = false;

    private _storeSubscription: Subscription | undefined;
    private readonly _autoFilledSubscription: Subscription | undefined;
    public _loginError: string = '';

    constructor(
        private _store: Store<InitialSessionStateTypes>,
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
        this._store.dispatch(NgrxAction.userToggleIfSaveAccount({ ifSaveAccount: true }));
        this._storeSubscription = this._store
            .select(NgrxSelector.getLoginError)
            .subscribe(loginError => this._loginError = loginError);
    };

    public ngOnDestroy(): void {
        this._storeSubscription!.unsubscribe();
        this._autoFilledSubscription!.unsubscribe();
    };

    public handleSubmitForm(): void {
        const { login, password } = this._loginForm.getRawValue();
        this._store.dispatch(setSuspenseLoader({ status: true }));
        this._store.dispatch(NgrxAction.userLogin({ login, password }));
    };

    public handleChangePasswordVisibility(): void {
        if (this._loginForm.getRawValue().password !== '') {
            this._ifPasswordVisibility = !this._ifPasswordVisibility;
        }
    };

    public handleClearErrorMessage(): void {
        if (this._loginError !== '') {
            this._store.dispatch(NgrxAction.userFailureLogin({ errorMessage: '' }));
        }
    };

    public ifFieldHasErrors(fieldName: string): boolean {
        return this._loginForm.get(fieldName)!.touched && !this._loginForm.get(fieldName)!.valid;
    };

    public handleEventEmitter(value: boolean) {
        this._store.dispatch(NgrxAction.userToggleIfSaveAccount({ ifSaveAccount: value }));
    };
}