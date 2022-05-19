/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: new-study-specialization-informations.component.ts
 * Last modified | Ostatnia modyfikacja: 15/05/2022, 05:43
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

import * as NgrxSelector_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';
import * as NgrxAction_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.actions';
import { PostDataReducerType } from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';
import { CmsStudySpecResDataModel } from '../../ngrx-store/post-data-ngrx-store/ngrx-models/cms-study-spec-req-res-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku z informacjami odnośnie dodanego kierunku/kierunków studiów.
 */

@Component({
    selector: 'app-new-study-specialization-informations',
    templateUrl: './new-study-specialization-informations.component.html',
    styleUrls: [ './new-study-specialization-informations.component.scss' ],
})
export class NewStudySpecializationInformationsComponent implements OnInit, OnDestroy {

    private _subscription?: Subscription;
    public _studySpecData: Array<CmsStudySpecResDataModel> = new Array<CmsStudySpecResDataModel>();

    public _loadingSus$: Observable<boolean> = this._store.select(NgrxSelector_PDA.sel_postDataSuspenseLoading);

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<PostDataReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._subscription = this._store
            .select(NgrxSelector_PDA.sel_newStudySpecializationData)
            .subscribe(studySpecData => this._studySpecData = studySpecData);
    };

    public ngOnDestroy(): void {
        this._subscription?.unsubscribe();
        this._store.dispatch(NgrxAction_PDA.__clearAllPostData());
    };
}