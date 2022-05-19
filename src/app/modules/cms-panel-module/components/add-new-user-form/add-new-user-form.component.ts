/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: add-new-user-form.component.ts
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MiscHelper } from '../../../../utils/misc.helper';
import { UserIdentityType } from '../../../../types/user-identity.type';
import { ObjectMapperHelper } from '../../../../utils/object-mapper.helper';
import { SelectListTupleModel } from '../../../templates-module/models/select-list-tuple.model';

import * as NgrxAction_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.actions';
import * as NgrxSelector_PDA from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';
import { PostDataReducerType } from '../../ngrx-store/post-data-ngrx-store/post-data.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za wyświetlanie formularza umożliwiającego rejestrację (dodanie)
 * nowego użytkownika do systemu.
 */

@Component({
    selector: 'app-add-new-user-form',
    templateUrl: './add-new-user-form.component.html',
    styleUrls: [],
})
export class AddNewUserFormComponent implements OnInit, OnDestroy {

    public readonly _registerUserForm: FormGroup;
    public readonly _checkError = (name: string) => MiscHelper.checkNgFormError(this._registerUserForm, name);

    public readonly _studentRole = UserIdentityType.STUDENT;
    public readonly _allRoles: Array<SelectListTupleModel> = this._mapper.__allRoles;
    public _serverError?: string;

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _mapper: ObjectMapperHelper,
        private _store: Store<PostDataReducerType>,
    ) {
        this._registerUserForm = new FormGroup({
            name: new FormControl('', [ Validators.required ]),
            surname: new FormControl('', [ Validators.required ]),
            city: new FormControl('', [ Validators.required ]),
            nationality: new FormControl('', [ Validators.required ]),
            role: new FormControl('', [ Validators.required ]),
            departmentName: new FormControl(''),
            cathedralName: new FormControl(''),
            studySpecName: new FormControl(''),
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
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleSubmitRegisterUser(): void {
        this._store.dispatch(NgrxAction_PDA.__registerNewUser({ userData: this._registerUserForm.getRawValue() }));
        this._registerUserForm.reset();
    };
}