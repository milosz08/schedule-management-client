/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: checkbox-template.component.ts
 * Last modified | Ostatnia modyfikacja: 30/04/2022, 12:20
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MiscHelper } from '../../../../utils/misc.helper';

/**
 * Komponent uniwersalny generujący strukturę dla inputa checbox.
 */

@Component({
    selector: 'app-checkbox-template',
    templateUrl: './checkbox-template.component.html',
    styleUrls: [ './checkbox-template.component.scss' ]
})
export class CheckboxTemplateComponent implements OnInit {

    private _checkboxId: string = '';

    @Input()
    public _checkboxValue: boolean = false;

    @Input()
    public _checkboxLabel: string = '';

    @Input()
    public _checkboxDisabled: boolean = false;

    @Output()
    public _checkedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    public ngOnInit(): void {
        this._checkboxId = MiscHelper.randomCharactersGenerator();
    };

    public handleCheckboxToggle(ifChecked: boolean): void {
        this._checkboxValue = !this._checkboxValue;
        this._checkedEmitter.emit(ifChecked);
    };

    get __createChecboxIdBasedLabel(): string {
        return `${this._checkboxId}__${this._checkboxLabel.replaceAll(' ', '_').toLowerCase()}`;
    };
}