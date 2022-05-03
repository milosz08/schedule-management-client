/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: send-token-via-email-form.component.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 12:42
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

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as NgrxAction from '../../ngrx-store/reset-password-ngrx-store/reset-password.actions';
import * as NgrxSelector from '../../ngrx-store/reset-password-ngrx-store/reset-password.selectors';
import * as NgrxAction_SHA from '../../../shared-module/ngrx-store/shared-ngrx-store/shared.actions';

import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie widoku wysłania tokenu resetującego hasło do systemu.
 */

@Component({
    selector: 'app-send-token-via-email-form',
    templateUrl: './send-token-via-email-form.component.html',
    styleUrls: [ './send-token-via-email-form.component.scss' ]
})
export class SendTokenViaEmailFormComponent implements OnInit, OnDestroy {

    public readonly _resetPasswordForm: FormGroup;
    private _subscription?: Subscription;
    public _emailMessage: string = '';

    @Output()
    public _discardEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<SessionReducerType>,
    ) {
        this._resetPasswordForm = new FormGroup({
            email: new FormControl('', [ Validators.required, Validators.email ]),
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._subscription = this._store
            .select(NgrxSelector.sel_resetPasswordSendTokenMessage)
            .subscribe(emailMessage => this._emailMessage = emailMessage);
    };

    public ngOnDestroy(): void {
        this._subscription?.unsubscribe();
    };

    public handleSubmitSendTokenViaEmail(): void {
        this._discardEmitter.emit(false);
        const { email } = this._resetPasswordForm.getRawValue();
        this._store.dispatch(NgrxAction_SHA.__setSuspenseLoader({ status: true }));
        this._store.dispatch(NgrxAction.__sendResetPasswordToken({ email }));
    };

    public handleClearErrorMessage(): void {
        if (this._emailMessage !== '') {
            this._store.dispatch(NgrxAction.__resetTokenClearMessage());
        }
    };

    get __ifEmailFieldHasErrors(): boolean {
        return this._resetPasswordForm.get('email')!.touched && !this._resetPasswordForm.get('email')!.valid;
    };
}