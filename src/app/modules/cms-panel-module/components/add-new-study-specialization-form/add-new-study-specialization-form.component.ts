/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: add-new-study-specialization-form.component.ts
 * Last modified | Ostatnia modyfikacja: 15/05/2022, 05:41
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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MiscHelper } from '../../../../utils/misc.helper';
import { NameWithId } from '../../models/cms-drop-lists-data.model';

import * as NgrxAction_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.actions';
import * as NgrxSelector_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';
import { PostDataReducerType } from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';

import { CmsGetAllConnectorService } from '../../services/cms-get-all-connector.service';
import { CmsGetQueryConnectorService } from '../../services/cms-get-query-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie formularza umożliwiającego wprowadzenie nowego kierunku studiów.
 */

@Component({
    selector: 'app-add-new-study-specialization-form',
    templateUrl: './add-new-study-specialization-form.component.html',
    styleUrls: [],
    providers: [ CmsGetAllConnectorService ],
})
export class AddNewStudySpecializationFormComponent implements OnInit, OnDestroy {

    public readonly _newStudySpecForm: FormGroup;
    public readonly _checkError = (name: string) => MiscHelper.checkNgFormError(this._newStudySpecForm, name);

    public _studyAllSpec: Array<NameWithId> = new Array<NameWithId>();
    public _studyDegrees: Array<NameWithId> = new Array<NameWithId>();
    public _queryResultArray: Array<string> = new Array<string>();

    public _serverError?: string;

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<PostDataReducerType>,
        private _serviceGET: CmsGetAllConnectorService,
        private _serviceQueryGet: CmsGetQueryConnectorService,
    ) {
        this._newStudySpecForm = new FormGroup({
            name: new FormControl('', [ Validators.required ]),
            alias: new FormControl('', [ Validators.required ]),
            departmentName: new FormControl('', [ Validators.required ]),
            studyType: new FormControl([], [ Validators.required ]),
            studyDegree: new FormControl([], [ Validators.required ]),
        });
        this._newStudySpecForm.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            if (this._serverError !== '') {
                this._store.dispatch(NgrxAction_PDA.__clearNewContentServerError());
            }
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this.handleEmitNewQuery('');
        this._store
            .pipe(takeUntil(this._unsubscribe), select(NgrxSelector_PDA.sel_postDataServerErrorMessage))
            .subscribe(errorMessage => this._serverError = errorMessage);
        this._serviceGET
            .getAllAvailableStudyTypes()
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(types => this._studyAllSpec = types.dataElements);
        this._serviceGET
            .getAllAvailableStudyDegrees()
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(types => this._studyDegrees = types.dataElements);
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleSubmitNewStudySpec(): void {
        this._store.dispatch(NgrxAction_PDA.__addNewStudySpec({ studyData: this._newStudySpecForm.getRawValue() }));
        this._newStudySpecForm.reset({ studyType: [], studyDegree: [] });
    };

    public handleEmitNewQuery(queryValue: string): void {
        this._serviceQueryGet.getQueryDepartmentsList(queryValue)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => this._queryResultArray = q.dataElements);
    };
}