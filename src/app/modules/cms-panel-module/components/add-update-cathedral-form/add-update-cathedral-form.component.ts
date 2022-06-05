/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: add-update-cathedral-form.component.ts
 * Last modified | Ostatnia modyfikacja: 15/05/2022, 02:51
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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { catchError, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MiscHelper } from '../../../../utils/misc.helper';

import * as NgrxAction_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.actions';
import * as NgrxSelector_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';
import { PostDataReducerType } from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';

import { CmsGetQueryConnectorService } from '../../services/cms-get-query-connector.service';
import { CmsGetSingleForPostConnectorService } from '../../services/cms-get-single-for-post-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za wyświetlanie formularza umożliwiającego dodanie nowej katedry (przypisanej do
 * wybranego wydziału) Komponent aktywny tylko wtedy, gdy w tabeli wydziałów znajduje się jakikolwiek wydział.
 */

@Component({
    selector: 'app-add-update-cathedral-form',
    templateUrl: './add-update-cathedral-form.component.html',
    styleUrls: [],
    providers: [ CmsGetQueryConnectorService, CmsGetSingleForPostConnectorService ],
})
export class AddUpdateCathedralFormComponent implements OnInit, OnDestroy {

    public readonly _newCathedralForm: FormGroup;
    public readonly _checkError = (name: string) => MiscHelper.checkNgFormError(this._newCathedralForm, name);

    public _notFoundContent: string = '';
    public _queryResultArray: Array<string> = new Array<string>();
    public _serverError?: string;

    private _unsubscribe: Subject<void> = new Subject();

    @Input() public _ifEditMode: boolean = false;
    @Input() public _dataId!: number;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<PostDataReducerType>,
        private _serviceGET: CmsGetQueryConnectorService,
        private _serviceSingleGET: CmsGetSingleForPostConnectorService,
    ) {
        this._newCathedralForm = new FormGroup({
            name: new FormControl('', [ Validators.required ]),
            alias: new FormControl('', [ Validators.required ]),
            departmentName: new FormControl('', [ Validators.required ]),
        });
        this._newCathedralForm.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
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
        if (this._ifEditMode && this._dataId) {
            this._serviceSingleGET.getCathedralBaseDbId(this._dataId).pipe(
                takeUntil(this._unsubscribe),
                catchError(({ error }) => {
                    this._notFoundContent = error.message;
                    return of();
                })
            ).subscribe(data => {
                Object.keys(data).forEach(key => this._newCathedralForm.get(key)?.patchValue(data[key]));
                this._newCathedralForm.get('departmentName')?.disable();
            });
        }
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleSubmitNewCathedral(): void {
        this._store.dispatch(NgrxAction_PDA.__addUpdateCathedral({
            cathData: this._newCathedralForm.getRawValue(), cathId: this._dataId }));
        if (!this._ifEditMode) {
            this._newCathedralForm.reset();
        }
    };

    public handleEmitNewQuery(queryValue: string): void {
        this._serviceGET.getQueryDepartmentsList(queryValue)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(queryResults => this._queryResultArray = queryResults.dataElements);
    };
}