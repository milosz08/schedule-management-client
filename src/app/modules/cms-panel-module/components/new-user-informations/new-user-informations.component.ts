/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: new-user-informations.component.ts
 * Last modified | Ostatnia modyfikacja: 11/05/2022, 20:13
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
import { UserIdentityType } from '../../../../types/user-identity.type';

import * as NgrxAction_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.actions';
import * as NgrxSelector_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';
import { PostDataReducerType } from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';
import { CmsRegisterResDataModel } from '../../ngrx-store/post-data-ngrx-store/ngrx-models/cms-register-req-res-data.model';

import { CmsFileIoCommunicationService } from '../../services/cms-file-io-communication.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku informacji o dodanym użytkowniku.
 */

@Component({
    selector: 'app-new-user-informations',
    templateUrl: './new-user-informations.component.html',
    styleUrls: [ './new-user-informations.component.scss' ],
    providers: [ CmsFileIoCommunicationService ],
})
export class NewUserInformationsComponent implements OnInit, OnDestroy {

    private _subscription?: Subscription;
    public _userData?: CmsRegisterResDataModel;

    public _loadingSus$: Observable<boolean> = this._store.select(NgrxSelector_PDA.sel_postDataSuspenseLoading);
    public _getPlName = (role: UserIdentityType): string => MiscHelper.convertEngToPlUserRole(role)

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<PostDataReducerType>,
        private _fileIoService: CmsFileIoCommunicationService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._subscription = this._store
            .select(NgrxSelector_PDA.sel_registeredUserData)
            .subscribe(userData => this._userData = userData);
    };

    public ngOnDestroy(): void {
        this._subscription?.unsubscribe();
        this._store.dispatch(NgrxAction_PDA.__clearAllPostData());
    };

    public saveDataToFile(): void {
        this._fileIoService.saveDataIntoFile(this._userData!);
    };
}