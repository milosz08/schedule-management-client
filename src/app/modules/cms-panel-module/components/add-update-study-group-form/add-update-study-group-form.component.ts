/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: add-update-study-group-form.component.ts
 * Last modified | Ostatnia modyfikacja: 21/05/2022, 15:14
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

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie formularza umożliwiającego wprowadzenie nowej grupy dziekańskiej.
 */

@Component({
    selector: 'app-add-update-study-group-form',
    templateUrl: './add-update-study-group-form.component.html',
    styleUrls: [],
    providers: [ CmsGetAllConnectorService ],
})
export class AddUpdateStudyGroupFormComponent implements OnInit, OnDestroy {

    public readonly _newStudyGroupForm: FormGroup;
    public readonly _checkError = (name: string) => MiscHelper.checkNgFormError(this._newStudyGroupForm, name);

    public _allSemesters: Array<NameWithId> = new Array<NameWithId>();

    public _serverError?: string;
    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<PostDataReducerType>,
        private _serviceGET: CmsGetAllConnectorService,
    ) {
        this._newStudyGroupForm = new FormGroup({
            departmentName: new FormControl('', [ Validators.required ]),
            studySpecName: new FormControl('', [ Validators.required ]),
            semesters: new FormControl([], [ Validators.required ]),
            countOfGroups: new FormControl(1, [ Validators.required, Validators.min(1) ]),
        });
        this._newStudyGroupForm.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
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
        this._serviceGET.getAllAvailableSemesters()
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => this._allSemesters = q.dataElements);
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleSubmitNewStudyGroup(): void {
        this._store.dispatch(NgrxAction_PDA.__addNewStudyGroup({ groupData: this._newStudyGroupForm.getRawValue() }));
        this._newStudyGroupForm.reset({ semesters: [] });
    };
}