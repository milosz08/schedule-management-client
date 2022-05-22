/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: select-list-template.component.ts
 * Last modified | Ostatnia modyfikacja: 15/05/2022, 10:21
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

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie rozwijanej listy z możliwością wyboru elementów (na podstawie
 * przekazywanej tablicy elementów).
 */

@Component({
    selector: 'app-select-list-template',
    templateUrl: './select-list-template.component.html',
    styleUrls: [ './select-list-template.component.scss' ]
})
export class SelectListTemplateComponent {

    public _listVisible: boolean = false;

    @Input() public _listElements: Array<string> = new Array<string>();

    @Input() public _formGroup?: FormGroup;
    @Input() public _formControlName: string = '';
    @Input() public _placeholder: string = '';
    @Input() public _errorField: string = '';
    @Input() public _inputId: string = '';

    //------------------------------------------------------------------------------------------------------------------

    public handleOpenListVisibility(): void {
        this._listVisible = true;
    };

    public handleCloseListVisibility(): void {
        setTimeout(() => this._listVisible = false, 200);
    };

    public handleInsertToInputValue(value: string): void {
        this._formGroup?.patchValue({ [this._formControlName]: value });
        this._listVisible = false;
    };
}