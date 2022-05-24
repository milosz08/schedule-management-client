/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-choose-schedule-form-administrator.component.ts
 * Last modified | Ostatnia modyfikacja: 24/05/2022, 19:07
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
import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as NgrxAction_SMA from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.actions';
import { ScheduleManipulatorReducerType } from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.selectors';

import { CmsGetQueryConnectorService } from '../../services/cms-get-query-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie formularza umożliwiającego wybór edytowanego planu konkretnej grupy dla
 * użytkownika z rangą administrator (możliwość wyboru wydziału).
 */

@Component({
    selector: 'app-cms-choose-schedule-form-administrator',
    templateUrl: './cms-choose-schedule-form-administrator.component.html',
    styleUrls: [],
})
export class CmsChooseScheduleFormAdministratorComponent implements OnInit, OnDestroy {

    public _allScheduleGroups: Array<string> = new Array<string>();
    public _groupsVisibility: boolean = false;
    public _serverError?: string;

    public _selectScheduleGroupForm: FormGroup;
    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _serviceGET: CmsGetQueryConnectorService,
        private _store: Store<ScheduleManipulatorReducerType>,
    ) {
        this._selectScheduleGroupForm = new FormGroup({
            departmentName: new FormControl('', [ Validators.required ]),
            studySpecName: new FormControl('', [ Validators.required ]),
            studyGroupName: new FormControl('', [ Validators.required ]),
        });
        this._selectScheduleGroupForm.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            if (this._serverError !== '') {
                this._store.dispatch(NgrxAction_SMA.__clearServerErrorMessage());
            }
        });
        this._selectScheduleGroupForm?.get('studySpecName')?.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            this.handleEmitStudyGroupsQuery('');
            this._selectScheduleGroupForm?.get('studyGroupName')?.patchValue('');
            this._groupsVisibility = false;
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._store.dispatch(NgrxAction_SMA.__clearConvertScheduleData());
        this.handleEmitStudyGroupsQuery('');
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleSubmitSelectScheduleGroup(): void {
        const schedData = this._selectScheduleGroupForm.getRawValue();
        this._store.dispatch(NgrxAction_SMA.__convertScheduleData({ schedData }));
    };

    public handleShowScheduleGroups(): void {
        this.handleEmitStudyGroupsQuery('');
        this._groupsVisibility = true;
    };

    public handleEmitStudyGroupsQuery(studyGroup: string): void {
        this._serviceGET.getQueryGroupsBaseDeptAndSpec(
            studyGroup,
            this._selectScheduleGroupForm.get('departmentName')!.value,
            this._selectScheduleGroupForm.get('studySpecName')!.value
        )
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => this._allScheduleGroups = q.dataElements);
    };
}