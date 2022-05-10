/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-pagination-options.component.ts
 * Last modified | Ostatnia modyfikacja: 09/05/2022, 21:08
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

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { CurrentActivePages } from '../../models/cms-pagination-data.model';

import * as NgrxAction_NAV from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.actions';
import * as NgrxSelector_NAV from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.selectors';
import { ListNavigationsReducerType} from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie sekcji odpowiedzialnej za paginację tabeli.
 */

@Component({
    selector: 'app-cms-pagination-options',
    templateUrl: './cms-pagination-options.component.html',
    styleUrls: [ './cms-pagination-options.component.scss' ],
})
export class CmsPaginationOptionsComponent implements OnInit, OnDestroy {

    public _allPaginations$: Observable<Array<number>> = this._store.select(NgrxSelector_NAV.sel_availablePaginations);

    private _subscription?: Subscription;
    public _activePagination?: number;
    public _currentPage?: number;

    @Input()
    public _pagesMaxCount?: number;

    @Input()
    public _currentActivePages?: CurrentActivePages;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<ListNavigationsReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._subscription = this._store
            .select(NgrxSelector_NAV.sel_currentPageAndActivePagination)
            .subscribe(({ currentPage, activePagination }) => {
                this._currentPage = currentPage;
                this._activePagination = activePagination;
            });
    };

    public ngOnDestroy(): void {
        this._subscription?.unsubscribe();
    };

    public handleChangePaginationSize(paginationSize: number): void {
        this._store.dispatch(NgrxAction_NAV.__changePaginationSize({ paginationSize }));
    };

    public handlePrevPage(): void {
        if (this._currentPage! - 1 > 0) {
            this._store.dispatch(NgrxAction_NAV.__decreasePageNumber());
        }
    };

    public handleNextPage(): void {
        if (this._currentPage! < this._pagesMaxCount!) {
            this._store.dispatch(NgrxAction_NAV.__increasePageNumber());
        }
    };

    public handleClickPageNumber(currentPage: number): void {
        this._store.dispatch(NgrxAction_NAV.__setCurrentPage({ currentPage }));
    };

    public getPaginationActiveCssClass(size: number): string {
        return size === this._activePagination ? 'pagination-button--active' : '';
    };

    public getActivePageCssClass(currentPage: number): string {
        return this._currentPage === currentPage ? 'pagination-button--active' : '';
    };

    public createArrayFromLength(length: number): Array<number> {
        return Array.from({ length }, (v, i) => i + 1);
    };
}