/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: combo-box-template.component.ts
 * Last modified | Ostatnia modyfikacja: 20/05/2022, 11:42
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

import { Component, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NameWithId } from '../../../cms-panel-module/models/cms-drop-lists-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za generowanie combo boxa wyświetlającego elementy na podstawie przekazywanej tablicy.
 * Combobox pokazuje się po naciśnięciu w pole, a chowa się po utracie focusa i naciśnięciu na obszar kanwy.
 * Combobox współpracuje z inputem typu tablicowego na tupli (name, id).
 */

@Component({
    selector: 'app-combo-box-template',
    templateUrl: './combo-box-template.component.html',
    styleUrls: [ './combo-box-template.component.scss' ]
})
export class ComboBoxTemplateComponent {

    public _listVisible: boolean = false;
    private _ifLostFocus: boolean = false;

    @Input() public _formGroup?: FormGroup;
    @Input() public _formControlName: string = '';
    @Input() public _placeholder: string = '';
    @Input() public _allOptions: Array<NameWithId> = new Array<NameWithId>();

    //------------------------------------------------------------------------------------------------------------------

    @HostListener('document:click', ['$event'])
    public handlerFunction() {
        if (this._ifLostFocus) {
            this._listVisible = false;
        }
    };

    public handleChangeFocus(ifFocused: boolean): void {
        this._ifLostFocus = ifFocused;
    };

    public handleOpenList(): void {
        if (this._listVisible) {
        } else {
            this._ifLostFocus = false;
            this._listVisible = true;
        }
    };

    public valuesArrayLenght(): number {
        return this._formGroup?.get(this._formControlName)!.value.length;
    };

    public checkedInitial(dbIdx: number | string): boolean {
        return this._formGroup!.get(this._formControlName)!.value.includes(dbIdx);
    };

    public handleToggleValuesInArray(status: boolean, value: number | string): void {
        const allElements = this._formGroup!.get(this._formControlName)!.value;
        const control =  this._formGroup!.get(this._formControlName)!;
        if (status) {
            control.patchValue([ ...allElements, value ]);
        } else {
            control.patchValue(allElements.filter((el: number) => el !== value));
        }
    };

    get __countOfElementsCssClassActive(): string {
        const listLength = this._formGroup!.get(this._formControlName)!.value.length;
        return `combo-box__button ${listLength > 0 ? 'button--active' : ''}`;
    };
}