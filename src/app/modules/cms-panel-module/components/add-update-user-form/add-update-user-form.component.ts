/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: add-update-user-form.component.ts
 * Last modified | Ostatnia modyfikacja: 11/05/2022, 14:18
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

import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { catchError, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MiscHelper } from '../../../../utils/misc.helper';

import * as NgrxAction_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.actions';
import * as NgrxSelector_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';
import { PostDataReducerType } from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';

import { CmsGetAllConnectorService } from '../../services/cms-get-all-connector.service';
import { CmsGetSingleForPostConnectorService } from '../../services/cms-get-single-for-post-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za wyświetlanie formularza umożliwiającego rejestrację (dodanie)
 * nowego użytkownika do systemu.
 */

@Component({
    selector: 'app-add-update-user-form',
    templateUrl: './add-update-user-form.component.html',
    styleUrls: [],
    providers: [ CmsGetAllConnectorService, CmsGetSingleForPostConnectorService ],
})
export class AddUpdateUserFormComponent implements OnInit, OnDestroy, AfterContentChecked {

    public readonly _registerUserForm: FormGroup;
    public readonly _checkError = (name: string) => MiscHelper.checkNgFormError(this._registerUserForm, name);

    public _allRoles: Array<string> = new Array<string>();
    public _notFoundContent: string = '';
    public _serverError?: string;

    private _unsubscribe: Subject<void> = new Subject();
    private _ifRegeneratePassword: boolean = false;

    @Input() public _ifEditMode: boolean = false;
    @Input() public _dataId!: number;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _changeDetector: ChangeDetectorRef,
        private _store: Store<PostDataReducerType>,
        private _serviceGET: CmsGetAllConnectorService,
        private _serviceSingleGET: CmsGetSingleForPostConnectorService,
    ) {
        this._registerUserForm = new FormGroup({
            name: new FormControl('', [ Validators.required ]),
            surname: new FormControl('', [ Validators.required ]),
            city: new FormControl('', [ Validators.required ]),
            nationality: new FormControl('', [ Validators.required ]),
            role: new FormControl('', [ Validators.required ]),
            departmentName: new FormControl('', [ Validators.required ]),
            cathedralName: new FormControl(''),
            studySpecsOrSubjects: new FormControl([]),
        });
        this._registerUserForm.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
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
        this._serviceGET
            .getAllAvailableRoles()
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => this._allRoles = q.dataElements);
        if (this._ifEditMode && this._dataId) {
            this._serviceSingleGET.getUserAccountDetailsBaseDbId(this._dataId).pipe(
                takeUntil(this._unsubscribe),
                catchError(({ error }) => {
                    this._notFoundContent = error.message;
                    return of();
                })
            ).subscribe(data => {
                Object.keys(data).forEach(key => this._registerUserForm.get(key)?.patchValue(data[key]));
                this._registerUserForm.get('name')?.disable();
                this._registerUserForm.get('surname')?.disable();
            });
        }
    };

    public ngAfterContentChecked(): void {
        this._changeDetector.detectChanges();
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleToggleGenerateNewEmailPassword(ifActive: boolean): void {
        this._ifRegeneratePassword = ifActive;
    };

    public handleSubmitRegisterUser(): void {
        this._store.dispatch(NgrxAction_PDA.__registerUpdateUser({ userData: this._registerUserForm.getRawValue(),
            userId: this._dataId, ifUpdateEmailPass: this._ifRegeneratePassword }));
        if (!this._ifEditMode) {
            this._registerUserForm.reset({ studySpecsOrSubjects: [] });
        }
    };
}