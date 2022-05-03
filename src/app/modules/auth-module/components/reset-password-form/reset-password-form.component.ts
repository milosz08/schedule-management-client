/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: reset-password-form.component.ts
 * Last modified | Ostatnia modyfikacja: 03/05/2022, 01:27
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

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { AngularFormValidator } from '../../../../validators/angular-form.validator';
import { RequestResetPasswordModel } from '../../../../models/request-reset-password.model';

import * as NgrxAction_RES from '../../ngrx-store/reset-password-ngrx-store/reset-password.actions';
import * as NgrxAction_SHA from '../../../shared-module/ngrx-store/shared-ngrx-store/shared.actions';
import * as NgrxSelector_RES from '../../ngrx-store/reset-password-ngrx-store/reset-password.selectors';
import { ResetPasswordReducerType } from '../../ngrx-store/reset-password-ngrx-store/reset-password.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent renderujący widok formularza umożliwiającego wprowadzenie nowego hasła.
 */

@Component({
    selector: 'app-reset-password-form',
    templateUrl: './reset-password-form.component.html',
    styleUrls: [ './reset-password-form.component.scss' ]
})
export class ResetPasswordFormComponent implements OnInit, OnDestroy {

    public _resetPasswordForm: FormGroup;

    public _newPasswordServerMessage: string = '';
    private _storeSubscription?: Subscription;

    @Input()
    public _bearerToken: string = '';

    @Output()
    public _discardEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<ResetPasswordReducerType>
    ) {
        this._resetPasswordForm = new FormGroup({
            newPassword: new FormControl('', [
                Validators.required,
                AngularFormValidator.passwordRegexpValidator()
            ]),
            newPasswordConfirmed: new FormControl('', [
                Validators.required,
                AngularFormValidator.passwordRegexpValidator()
            ]),
        }, {
            validators: AngularFormValidator.passwordMismatchValidator,
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._storeSubscription = this._store
            .select(NgrxSelector_RES.sel_resetPasswordFormMessage)
            .subscribe(message => this._newPasswordServerMessage = message);
    };

    public ngOnDestroy(): void {
        this._storeSubscription?.unsubscribe();
    };

    public handleSubmitNewUserPassword(): void {
        this._discardEmitter.emit(false);
        const formData = this._resetPasswordForm.getRawValue();
        const passwordsPayload = new RequestResetPasswordModel(formData, this._bearerToken);
        this._store.dispatch(NgrxAction_SHA.__setSuspenseLoader({ status: true }));
        this._store.dispatch(NgrxAction_RES.__resetPasswordSendNewPassword({ passwordsPayload }))
    };

    public handleClearErrorMessage(): void {
        if (this._newPasswordServerMessage !== '') {
            this._store.dispatch(NgrxAction_RES.__resetPasswordClearFormMessage());
        }
    };

    get __passwordFieldErrors(): boolean {
        return this._resetPasswordForm.get('newPassword')!.touched
            && this._resetPasswordForm.get('newPassword')!.errors?.['notMath'];
    };

    get __ifErrorOrSimpleMessage(): string {
        return this._newPasswordServerMessage.toLowerCase().includes('zmienione')
            ? 'app__input-message app__input-message--light' : 'app__input-error app__input-error--light';
    };
}