/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-users-table.component.ts
 * Last modified | Ostatnia modyfikacja: 09/05/2022, 16:55
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MiscHelper } from '../../../../utils/misc.helper';
import { ApiConfigurerHelper } from '../../../../utils/api-configurer.helper';

import { UserIdentityType } from '../../../../types/user-identity.type';
import { BasicDataSortBy } from '../../types/basic-data-sort-by.types';
import { CmsPaginationDataModel, CmsSingleUserDataModel } from '../../models/cms-pagination-data.model';

import * as NgrxAction_NAV from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.actions';
import * as NgrxSelector_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import * as NgrxSelector_NAV from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.selectors';
import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import { ListNavigationsReducerType } from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.selectors';
import { PaginationNavSender } from '../../ngrx-store/list-navigations-ngrx-store/ngrx-models/pagination-nav-sender.model';

import { CmsGetConnectorService } from '../../services/cms-get-connector.service';

//----------------------------------------------------------------------------------------------------------------------

type CombinedStore = ListNavigationsReducerType | SessionReducerType;

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku tabeli użytkowników (wraz z możliwością paginacji i
 * zaawansowanego sortowania rekordów).
 */

@Component({
    selector: 'app-cms-users-table',
    templateUrl: './cms-users-table.component.html',
    styleUrls: [ './cms-users-table.component.scss' ],
    providers: [ CmsGetConnectorService ],
})
export class CmsUsersTableComponent implements OnInit, OnDestroy {

    public _usersPagination?: CmsPaginationDataModel<CmsSingleUserDataModel>;
    public _userSortBy: typeof BasicDataSortBy = BasicDataSortBy;

    public _userLogin$: Observable<string> = this._store.select(NgrxSelector_SES.sel_userLogin);

    public _deleteUsers: Array<number> = new Array<number>();
    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<CombinedStore>,
        public _endpoints: ApiConfigurerHelper,
        private _serviceGET: CmsGetConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._store.dispatch(NgrxAction_NAV.__insertBaseListNavigations());
        this._store.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            takeUntil(this._unsubscribe),
            select(NgrxSelector_NAV.sel_combinedNavData)
        ).subscribe(data => {
            if (data.pageSize !== 1) {
                this._serviceGET
                    .getAllUsers(new PaginationNavSender(data))
                    .pipe(takeUntil(this._unsubscribe))
                    .subscribe(filteredPagination => {
                        this._usersPagination = filteredPagination;
                    });
            }
        });
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public getUserRole(role: UserIdentityType): { label: string, class: string } {
        return MiscHelper.createUserRoleAllPhrase(role);
    };
}