/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: dashboard-user-details-panel.component.ts
 * Last modified | Ostatnia modyfikacja: 02/06/2022, 23:21
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

import { Component, HostListener, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';

import * as NgrxAction_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.actions';
import * as NgrxSelector_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';

import { DashboardDetailsDataModel } from '../../models/dashboard-details-data.model';
import { BrowserStorageService } from '../../../shared-module/services/browser-storage.service';
import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';

import { CmsPostConnectorService } from '../../services/cms-post-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie sekcji z podstawowymi danymi użytkownika oraz możliwością zmiany lub
 * usunięcia zdjęcia profilowego.
 */

@Component({
    selector: 'app-dashboard-user-details-panel',
    templateUrl: './dashboard-user-details-panel.component.html',
    styleUrls: [ './dashboard-user-details-panel.component.scss' ]
})
export class DashboardUserDetailsPanelComponent implements OnDestroy {

    public _sessionLeftTime$: Observable<number> = this._store.select(NgrxSelector_SES.sel_userSessionCurrentTime);
    public _ifSessionSoonLogout$: Observable<boolean> = this._store.select(NgrxSelector_SES.sel_sessionSoonLogout);
    public _userNameAndSurname$: Observable<string> = this._store.select(NgrxSelector_SES.sel_userHeaderName);
    public _userAuthLevel$: Observable<string> = this._store.select(NgrxSelector_SES.sel_userAuthLevel);
    public _userLogin$: Observable<string> = this._store.select(NgrxSelector_SES.sel_userLogin);

    public _changeImageMess$: Observable<string> = this._store.select(NgrxSelector_SES.sel_updateUserImageServerMess);
    public _ifChangeIsError$: Observable<boolean> = this._store.select(NgrxSelector_SES.sel_ifUpdateUserImageServerError);
    public _ifHasImage$: Observable<boolean> = this._store.select(NgrxSelector_SES.sel_ifUserHasImage);

    @Input() public _dashboardDetailsData!: DashboardDetailsDataModel;

    public _imageName: string = '';
    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<SessionReducerType>,
        private _service: CmsPostConnectorService,
        private _storageService: BrowserStorageService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    @HostListener('document:click', ['$event'])
    public handlerFunction(_: MouseEvent) {
        this._store.dispatch(NgrxAction_SES.__changeUserImageErrorMessage({ serverRes: '', ifError: false }));
        this._imageName = '';
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleAddChangeUserImage(e: Event): void {
        this._store.dispatch(NgrxAction_SES.__changeUserImageErrorMessage({ serverRes: '', ifError: false }));
        const files = (e.target as HTMLInputElement).files!;
        this._imageName = files[0].name;
        const img = new Image();
        const objectUrl = window.URL.createObjectURL(files[0]);
        img.onload = () => {
            if (img.width !== 200 || img.height !== 200) {
                this._store.dispatch(NgrxAction_SES.__changeUserImageErrorMessage({
                    serverRes: 'Zdjęcie musi mieć rozmiar 200px na 200px.', ifError: true }));
            } else if (files[0].type !== 'image/jpeg') {
                this._store.dispatch(NgrxAction_SES.__changeUserImageErrorMessage({
                    serverRes: 'Wybrano nieprawidłowy format pliku.', ifError: true }));
            } else if (files.length > 1) {
                this._store.dispatch(NgrxAction_SES.__changeUserImageErrorMessage({
                    serverRes: 'Wybrano więcej niż jedno zdjęcie.', ifError: true }));
            } else {
                this._store.dispatch(NgrxAction_SES.__updateOrAddUserImage({ userImage: files[0] }));
            }
            window.URL.revokeObjectURL(objectUrl);
        };
        img.src = objectUrl;
    };

    public handleClearErrorField(): void {
        this._imageName = '';
        this._store.dispatch(NgrxAction_SES.__changeUserImageErrorMessage({ serverRes: '', ifError: false }));
    };

    public handleRemoveUserImage(): void {
        this._store.dispatch(NgrxAction_SES.__deleteUserImage());
    };
}