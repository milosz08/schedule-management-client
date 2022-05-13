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
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { MiscHelper } from '../../../../utils/misc.helper';
import { ApiConfigurerHelper } from '../../../../utils/api-configurer.helper';

import { UserIdentityType } from '../../../../types/user-identity.type';
import { BasicDataSortBy } from '../../types/basic-data-sort-by.types';
import { CmsPaginationDataModel } from '../../models/cms-pagination-data.model';

import * as NgrxAction_MOD from '../../../shared-module/ngrx-store/modals-ngrx-store/modals.actions';
import * as NgrxAction_NAV from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.actions';
import * as NgrxSelector_NAV from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.selectors';
import * as NgrxSelector_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import { ModalsReducerType } from '../../../shared-module/ngrx-store/modals-ngrx-store/modals.selectors';
import { ListNavigationsReducerType } from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.selectors';
import { InitialListNavigationStateTypes } from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.initial';

import { CmsGetConnectorService } from '../../services/cms-get-connector.service';
import { CmsDeleteConnectorService } from '../../services/cms-delete-connector.service';

//----------------------------------------------------------------------------------------------------------------------

type CombinedStore = ListNavigationsReducerType | SessionReducerType | ModalsReducerType;

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku tabeli użytkowników (wraz z możliwością paginacji i
 * zaawansowanego sortowania rekordów).
 */

@Component({
    selector: 'app-cms-users-table',
    templateUrl: './cms-users-table.component.html',
    styleUrls: [ './cms-users-table.component.scss' ],
    providers: [ CmsGetConnectorService, CmsDeleteConnectorService ],
})
export class CmsUsersTableComponent implements OnInit, OnDestroy {

    public _usersPagination?: CmsPaginationDataModel;
    public _userSortBy: typeof BasicDataSortBy = BasicDataSortBy;

    public _userLogin$: Observable<string> = this._store.select(NgrxSelector_SES.sel_userLogin);

    public _navigationState$: Observable<InitialListNavigationStateTypes> = this._store
        .select(NgrxSelector_NAV.sel_combinedNavData);

    public _navigationSubscription?: Subscription;
    public _serviceSubscription?: Subscription;

    public _deleteUsers: Array<number> = new Array<number>();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<CombinedStore>,
        private _endpoints: ApiConfigurerHelper,
        private _serviceGET: CmsGetConnectorService,
        private _serviceDELETE: CmsDeleteConnectorService,
    ) {
        this._navigationSubscription = this._navigationState$.subscribe(data => {
            if (data.pageSize !== 1) {
                const { searchPhrase, sortBy, sortDirection, pageSize, pageNumber } = data;
                this._serviceSubscription = this._serviceGET
                    .getAllUsers({ searchPhrase, pageNumber, pageSize, sortBy, sortDirection })
                    .subscribe(filteredPagination => {
                        this._usersPagination = filteredPagination;
                    });
            }
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._store.dispatch(NgrxAction_NAV.__insertBaseListNavigations());
    };

    public ngOnDestroy(): void {
        this._navigationSubscription?.unsubscribe();
        this._serviceSubscription?.unsubscribe();
        this._store.dispatch(NgrxAction_NAV.__insertBaseListNavigations());
    };

    public getUserRole(role: UserIdentityType): { label: string, class: string } {
        return MiscHelper.createUserRoleAllPhrase(role);
    };

    public handleDeleteUser(userId: number): void {
        this._store.dispatch(NgrxAction_MOD.__openRemoveContentModal({
            removeContentPath: this._endpoints.MASSIVE_DELETE_USERS, removeContentIds: [ userId ] }));
    };

    public handleDeleteAllUsers(): void {
        this._store.dispatch(NgrxAction_MOD.__openRemoveContentModal({
            removeContentPath: this._endpoints.DELETE_USER }));
    };

    public handleMassiveDeleteUsers(): void {
        this._store.dispatch(NgrxAction_MOD.__openRemoveContentModal({
            removeContentPath: this._endpoints.MASSIVE_DELETE_USERS, removeContentIds: this._deleteUsers }));
    };

    public toggleSelectedDeleteUser(ifChecked: boolean, userId: number) {
        if (ifChecked) {
            this._deleteUsers.push(userId);
        } else {
            this._deleteUsers = this._deleteUsers.filter(id => id !== userId);
        }
    };
}