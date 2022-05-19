/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: select-drop-box-template.component.ts
 * Last modified | Ostatnia modyfikacja: 15/05/2022, 19:42
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

import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie rozwijanej listy z możliwością wyboru oraz wyszukania elementu.
 */

@Component({
    selector: 'app-select-drop-box-template',
    templateUrl: './select-drop-box-template.component.html',
    styleUrls: [ './select-drop-box-template.component.scss' ]
})
export class SelectDropBoxTemplateComponent implements OnDestroy {

    public _searchQuery$: Subject<string> = new Subject<string>();
    public _listVisible: boolean = false;

    private _subscription?: Subscription;

    @Input() public _formGroup?: FormGroup;
    @Input() public _formControlName: string = '';

    @Input() public _selectId: string = '';
    @Input() public _placeholder!: string;
    @Input() public _errorField: string = '';
    @Input() public _optionsList: Array<string> = new Array<string>();

    @Output() public _emitNewQuery: EventEmitter<string> = new EventEmitter<string>();
    @Output() public _addedValue: EventEmitter<void> = new EventEmitter<void>();

    //------------------------------------------------------------------------------------------------------------------

    public constructor() {
        this._subscription = this._searchQuery$.pipe(
            debounceTime(400),
            distinctUntilChanged(),
        ).subscribe(textQuery => {
            this._emitNewQuery.emit(textQuery);
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this._subscription?.unsubscribe();
    };

    public handleOpenListVisibility(): void {
        this._listVisible = true;
    };

    public handleCloseListVisibility(): void {
        setTimeout(() => this._listVisible = false, 200);
    };

    public findIfInsertedValueExistInArray(): boolean {
        if (!this._formGroup?.get(this._formControlName)!) {
            return true;
        }
        return !this._optionsList.includes(this._formGroup?.get(this._formControlName)!.value);
    };

    public handleSelectSingleListElement(value: string): void {
        this._formGroup?.patchValue({ [this._formControlName]: value });
        if (this._addedValue && this._formGroup?.get(this._formControlName)!.valid) {
            this._addedValue.emit();
        }
        this._listVisible = false;
    };
}