/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-sorting-button.component.ts
 * Last modified | Ostatnia modyfikacja: 09/05/2022, 21:40
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

import { BasicDataSortBy } from '../../types/basic-data-sort-by.types';
import { AvailablesSortingTypes } from '../../types/availables-sorting.types';

import * as NgrxAction_NAV from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.actions';
import { ListNavigationsReducerType } from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za generowanie przycisku sortującego kolumny (na postawie parametrów).
 */

@Component({
    selector: 'app-cms-sorting-button',
    templateUrl: './cms-sorting-button.component.html',
    styleUrls: [ './cms-sorting-button.component.scss' ]
})
export class CmsSortingButtonComponent {

    public _sortingDir: AvailablesSortingTypes = AvailablesSortingTypes.ASC;

    @Input()
    public _sortingPlaceholder: string = '';

    @Input()
    public _sortingData: BasicDataSortBy = BasicDataSortBy.ID;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<ListNavigationsReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public handleSortingAscDesc(): void {
        if (this._sortingDir === AvailablesSortingTypes.ASC) {
            this._sortingDir = AvailablesSortingTypes.DES;
        } else {
            this._sortingDir = AvailablesSortingTypes.ASC;
        }
        this._store.dispatch(NgrxAction_NAV.__changeListSorting({
            dataSort: this._sortingData, direction: this._sortingDir
        }));
    };

    get __sortingArrowIcon(): string {
        return `keyboard_arrow_${this._sortingDir === AvailablesSortingTypes.ASC ? 'down' : 'up'}`;
    };
}