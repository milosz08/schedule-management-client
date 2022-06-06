/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: insert-token-form.component.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 13:20
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

import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as NgrxAction_RES from '../../ngrx-store/reset-password-ngrx-store/reset-password.actions';
import * as NgrxAction_SHA from '../../../shared-module/ngrx-store/shared-ngrx-store/shared.actions';
import * as NgrxSelector_RES from '../../ngrx-store/reset-password-ngrx-store/reset-password.selectors';

import { InitialResetPasswordStateTypes } from '../../ngrx-store/reset-password-ngrx-store/reset-password.initial';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za możliwość wprowadzenia tokenu odzyskującego hasło (pozyskanego
 * ze skrzynki pocztowej).
 */

@Component({
    selector: 'app-insert-token-form',
    templateUrl: './insert-token-form.component.html',
    styleUrls: [ './insert-token-form.component.scss' ],
})
export class InsertTokenFormComponent {

    public readonly _tokenFieldForm: FormGroup;
    private _subscription?: Subscription;
    public _tokenValidMessage: string = '';

    @Output() public _discardEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<InitialResetPasswordStateTypes>,
    ) {
        this._tokenFieldForm = new FormGroup({
            token: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._subscription = this._store
            .select(NgrxSelector_RES.sel_resetPasswordValidTokenMessage)
            .subscribe(tokenValidMessage => this._tokenValidMessage = tokenValidMessage);
    };

    public ngOnDestroy(): void {
        this._subscription?.unsubscribe();
    };

    public handleSubmitCheckToken(): void {
        this._discardEmitter.emit(false);
        const { token } = this._tokenFieldForm.getRawValue();
        this._store.dispatch(NgrxAction_SHA.__setSuspenseLoader({ status: true }));
        this._store.dispatch(NgrxAction_RES.__resetPasswordValidateToken({ token }))
    };

    public handleClearErrorMessage(): void {
        if (this._tokenValidMessage !== '') {
            this._store.dispatch(NgrxAction_RES.__resetValidateTokenClearMessage());
        }
    };

    get __ifTokenFieldHasErrors(): boolean {
        return this._tokenFieldForm.get('token')!.touched && this._tokenFieldForm.get('token')!.errors?.['minlength'];
    };
}