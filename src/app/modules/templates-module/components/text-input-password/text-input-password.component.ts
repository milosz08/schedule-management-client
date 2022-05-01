/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: text-input-password.component.ts
 * Last modified | Ostatnia modyfikacja: 01/05/2022, 01:16
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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { InitialSessionStateTypes } from '../../../../ngrx-store/session-ngrx-store/session.initial';

/**
 * Komponent uniwersalny odpowiadający za renderowania inputa typu password z możliwością zmiany
 * widoczności hasła (za pomocą przycisku).
 */

@Component({
    selector: 'app-text-input-password',
    templateUrl: './text-input-password.component.html',
    styleUrls: [ ],
})
export class TextInputPasswordComponent {

    public _ifPasswordVisibility: boolean = false;

    @Input()
    public _formControlName: string = '';

    @Input()
    public _inputPlaceholder: string = '';

    @Output()
    public _clearFormMessage: EventEmitter<Store> = new EventEmitter<Store>();

    @Input()
    public _formGroup?: FormGroup;

    @Input()
    public _ifLightTheme?: boolean = true;

    public constructor(
        public _store: Store<InitialSessionStateTypes>,
    ) {
    };

    public handleChangePasswordVisibility(): void {
        if (this._formGroup!.getRawValue()[this._formControlName] !== '') {
            this._ifPasswordVisibility = !this._ifPasswordVisibility;
        }
    };

    public handleClearErrorMessage(store: Store): void {
        this._clearFormMessage.emit(store);
    }

    get __styleClassThemeForInput(): string {
        return this._ifLightTheme ? ' app__input--light' : '';
    }
}