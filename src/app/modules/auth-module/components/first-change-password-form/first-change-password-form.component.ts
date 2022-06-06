/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: first-change-password-form.component.ts
 * Last modified | Ostatnia modyfikacja: 30/04/2022, 23:45
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

import { Subscription } from 'rxjs';

import { AngularFormValidator } from '../../../../validators/angular-form.validator';

import * as NgrxAction_SHA from '../../../shared-module/ngrx-store/shared-ngrx-store/shared.actions';
import * as NgrxAction_FCP from '../../ngrx-store/first-change-password-ngrx-store/first-change-password.actions';
import * as NgrxSelector_FCP from '../../ngrx-store/first-change-password-ngrx-store/first-change-password.selectors';

import { RequestFirstChangePasswordModel } from '../../../../models/request-first-change-password.model';
import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Widok odpowiadający za generowanie formularza umożliwiającego zmianę początkowo
 * wygenerowanego hasła systemowego.
 */

@Component({
    selector: 'app-first-change-password-form',
    templateUrl: './first-change-password-form.component.html',
    styleUrls: [ './first-change-password-form.component.scss' ],
})
export class FirstChangePasswordFormComponent implements OnInit, OnDestroy {

    public readonly _newPasswordForm: FormGroup;

    public _newPasswordServerMessage: string = '';
    private _storeSubscription?: Subscription;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<SessionReducerType>,
    ) {
        this._newPasswordForm = new FormGroup({
            oldPassword: new FormControl('', [ Validators.required ]),
            newPassword: new FormControl('', [ Validators.required, AngularFormValidator.passwordRegexpValidator() ]),
            newPasswordConfirmed: new FormControl('', [ Validators.required ]),
        }, {
            validators: AngularFormValidator.passwordMismatchValidator,
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._store.dispatch(NgrxAction_FCP.__resetChangeDefaultPasswordMessage());
        this._storeSubscription = this._store
            .select(NgrxSelector_FCP.sel_initialChangePasswordMessage)
            .subscribe(passwordError => this._newPasswordServerMessage = passwordError);
    };

    public ngOnDestroy(): void {
        this._storeSubscription!.unsubscribe();
    };

    public handleSubmitForm(): void {
        const passwordsPayload: RequestFirstChangePasswordModel = this._newPasswordForm.getRawValue();
        this._store.dispatch(NgrxAction_SHA.__setSuspenseLoader({ status: true }));
        this._store.dispatch(NgrxAction_FCP.__changeDefaultPassword({ passwordsPayload }));
    };

    public handleClearErrorMessage(): void {
        if (this._newPasswordServerMessage !== '') {
            this._store.dispatch(NgrxAction_FCP.__afterChangeDefaultPassword({ message: '' }))
        }
    };

    public ifFieldHasErrors(fieldName: string): boolean {
        return this._newPasswordForm.get(fieldName)!.touched && !this._newPasswordForm.get(fieldName)!.valid;
    };

    get __passwordFieldErrors(): boolean {
        return this._newPasswordForm.get('newPassword')!.touched
            && this._newPasswordForm.get('newPassword')!.errors?.['notMath'];
    };

    get __ifErrorOrSimpleMessage(): string {
        return this._newPasswordServerMessage.toLowerCase().includes('przekierowanie')
            ? 'app__input-message app__input-message--light' : 'app__input-error app__input-error--light';
    };
}