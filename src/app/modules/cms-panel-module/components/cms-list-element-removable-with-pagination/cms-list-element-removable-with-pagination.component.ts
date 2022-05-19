/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-list-element-removable-with-pagination.component.ts
 * Last modified | Ostatnia modyfikacja: 18/05/2022, 15:10
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
import { Store } from '@ngrx/store';

import { CmsPaginationDataModel } from '../../models/cms-pagination-data.model';

import * as NgrxAction_MOD from '../../../shared-module/ngrx-store/modals-ngrx-store/modals.actions';
import { ModalsReducerType } from '../../../shared-module/ngrx-store/modals-ngrx-store/modals.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie komponentu owijającego tablelę z danymi, umożliwiający między innymi
 * usuwanie elementów oraz paginację rezultatów.
 */

@Component({
    selector: 'app-cms-list-element-removable-with-pagination',
    templateUrl: './cms-list-element-removable-with-pagination.component.html',
    styleUrls: [],
})
export class CmsListElementRemovableWithPaginationComponent {

    @Input() public _pagination?: CmsPaginationDataModel<any>;
    @Input() public _deleteContentArray: Array<number> = new Array<number>();
    @Input() public _deletEndpoint: string = '';
    @Input() public _massiveDeleteEndpoint: string = '';

    @Output() public _emitMassiveDelete: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<ModalsReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public handleDeleteAllContent(): void {
        this._store.dispatch(NgrxAction_MOD.__openRemoveContentModal({ removeContentPath: this._deletEndpoint }));
    };

    public handleMassiveDeleteContent(): void {
        this._store.dispatch(NgrxAction_MOD.__openRemoveContentModal({
            removeContentPath: this._massiveDeleteEndpoint, removeContentIds: this._deleteContentArray }));
    };

    public disableRemoveAllButton(): boolean {
        return this._pagination!.elements.every(e => !Boolean(e.ifRemovable));
    };
}