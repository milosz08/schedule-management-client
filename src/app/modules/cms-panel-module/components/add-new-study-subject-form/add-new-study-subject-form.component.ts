/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: add-new-study-subject-form.component.ts
 * Last modified | Ostatnia modyfikacja: 18/05/2022, 01:28
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

import { CmsGetQueryConnectorService } from '../../services/cms-get-query-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie formularza umożliwiającego wprowadzenie nowych przedmiotów do istniejącego
 * już kierunku studiów.
 */

@Component({
    selector: 'app-add-new-study-subject-form',
    templateUrl: './add-new-study-subject-form.component.html',
    styleUrls: [],
    providers: [ CmsGetQueryConnectorService ],
})
export class AddNewStudySubjectFormComponent implements OnInit, OnDestroy {

    public readonly _newStudySubjectForm: FormGroup;
    public readonly _checkError = (name: string) => MiscHelper.checkNgFormError(this._newStudySubjectForm, name);

    public _serverError?: string;
    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<PostDataReducerType>,
        private _serviceGET: CmsGetQueryConnectorService,
    ) {
        this._newStudySubjectForm = new FormGroup({
            name: new FormControl('', [ Validators.required ]),
            departmentName: new FormControl('', [ Validators.required ]),
            studySpecName: new FormControl('', [ Validators.required ]),
        });
        this._newStudySubjectForm.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            if (this._serverError !== '') {
                this._store.dispatch(NgrxAction_PDA.__clearNewContentServerError());
            }
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._store
            .pipe(takeUntil(this._unsubscribe), select(NgrxSelector_PDA.sel_postDataServerErrorMessage))
            .subscribe(errorMessage => this._serverError = errorMessage);
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleSubmitNewStudySubject(): void {
        this._store.dispatch(NgrxAction_PDA.__addNewStudySubject({ subjectData: this._newStudySubjectForm.getRawValue() }));
        this._newStudySubjectForm.reset();
    };
}