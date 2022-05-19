/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-list-delete-single-element.component.ts
 * Last modified | Ostatnia modyfikacja: 18/05/2022, 15:28
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
import { Store } from '@ngrx/store';

import * as NgrxAction_MOD from '../../../shared-module/ngrx-store/modals-ngrx-store/modals.actions';
import { ModalsReducerType } from '../../../shared-module/ngrx-store/modals-ngrx-store/modals.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za multiusuwanie zawartości z tabeli (zaznaczanie pól checkbox).
 */

@Component({
    selector: '[app-cms-list-delete-single-element]',
    templateUrl: './cms-list-delete-single-element.component.html',
    styleUrls: [],
})
export class CmsListDeleteSingleElementComponent {

    @Input() public _deleteEndpoint: string = '';
    @Input() public _deleteContentList: Array<number> = new Array<number>();
    @Input() public _deleteContentId: number = NaN;
    @Input() public _ifContentRemovable: boolean = false;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<ModalsReducerType>,
    ) {
    };

    public handleDeleteContent(): void {
        this._store.dispatch(NgrxAction_MOD.__openRemoveContentModal({
            removeContentPath: this._deleteEndpoint, removeContentIds: [ this._deleteContentId ] }));
    };

    public toggleSelectedDeleteContent(ifChecked: boolean) {
        if (ifChecked) {
            this._deleteContentList.push(this._deleteContentId);
        } else {
            this._deleteContentList = this._deleteContentList.filter(id => id !== this._deleteContentId);
        }
    };
}