/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: add-new-cathedral-form.component.ts
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MiscHelper } from '../../../../utils/misc.helper';

import * as NgrxAction_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.actions';
import * as NgrxSelector_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';
import { PostDataReducerType } from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';

import { CmsGetConnectorService } from '../../services/cms-get-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za wyświetlanie formularza umożliwiającego dodanie nowej katedry (przypisanej do
 * wybranego wydziału) Komponent aktywny tylko wtedy, gdy w tabeli wydziałów znajduje się jakikolwiek wydział.
 */

@Component({
    selector: 'app-add-new-cathedral-form',
    templateUrl: './add-new-cathedral-form.component.html',
    styleUrls: [],
    providers: [ CmsGetConnectorService ],
})
export class AddNewCathedralFormComponent implements OnInit, OnDestroy {

    public readonly _newCathedralForm: FormGroup;
    public readonly _checkError = (name: string) => MiscHelper.checkNgFormError(this._newCathedralForm, name);

    public _queryResultArray: Array<string> = new Array<string>();
    public _serverError?: string;

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<PostDataReducerType>,
        private _serviceGET: CmsGetConnectorService,
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
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleSubmitNewCathedral(): void {
        this._store.dispatch(NgrxAction_PDA.__addNewCathedral({ cathData: this._newCathedralForm.getRawValue() }));
        this._newCathedralForm.reset();
    };

    public handleEmitNewQuery(queryValue: string): void {
        this._serviceGET.getQueryDepartmentsList(queryValue)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(queryResults => this._queryResultArray = queryResults.dataElements);
    };
}