/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: search-form-input.component.ts
 * Last modified | Ostatnia modyfikacja: 08/05/2022, 21:30
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

import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

import { MiscHelper } from '../../../../utils/misc.helper';

import * as NgrxAction_NAV from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.actions';
import { ListNavigationsReducerType } from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku formularza do wprowadzenia zapytania filtracji wyniku.
 */

@Component({
    selector: 'app-search-form-input',
    templateUrl: './search-form-input.component.html',
    styleUrls: [ './search-form-input.component.scss' ]
})
export class SearchFormInputComponent implements OnDestroy {

    public _searchQuery$: Subject<string> = new Subject<string>();
    private _subscription?: Subscription;

    public readonly _forId: string = MiscHelper.randomCharactersGenerator();

    @Input() public _inputPlaceholder: string = '';

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<ListNavigationsReducerType>,
    ) {
        this._subscription = this._searchQuery$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
        ).subscribe(textQuery => {
            this._store.dispatch(NgrxAction_NAV.__changeTextQuery({ textQuery }));
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this._subscription?.unsubscribe();
    };

    get __forIdentifier(): string {
        return `${this._inputPlaceholder}__text__${this._forId}`;
    };
}