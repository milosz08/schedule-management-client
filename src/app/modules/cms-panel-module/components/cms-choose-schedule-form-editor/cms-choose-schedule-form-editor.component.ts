/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-choose-schedule-form-editor.component.ts
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
import { select, Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CmsScheduleConvertReqDataModel } from '../../models/cms-schedule-convert-data.model';

import * as NgrxSelectro_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import * as NgrxAction_SMA from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.actions';
import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import { ScheduleManipulatorReducerType } from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.selectors';

import { CmsGetQueryConnectorService } from '../../services/cms-get-query-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie formularza umożliwiającego wybór edytowanego planu konkretnej grupy dla
 * użytkownika z rangą edytor (możliwość wyboru jedynie grupy na podstawie z góry przydzielonego wydziału).
 */

@Component({
    selector: 'app-cms-choose-schedule-form-editor',
    templateUrl: './cms-choose-schedule-form-editor.component.html',
    styleUrls: [ './cms-choose-schedule-form-editor.component.scss' ],
    providers: [ CmsGetQueryConnectorService ],
})
export class CmsChooseScheduleFormEditorComponent implements OnInit, OnDestroy {

    public _userDepartment: string = '';
    public _serverError?: string;

    public _allScheduleGroups: Array<string> = new Array<string>();
    public _allStudyTypes: Array<string> = new Array<string>();

    public _groupsVisibility: boolean = false;

    public _selectScheduleGroupForm: FormGroup;
    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<SessionReducerType | ScheduleManipulatorReducerType>,
        private _serviceGET: CmsGetQueryConnectorService,
    ) {
        this._selectScheduleGroupForm = new FormGroup({
            studySpecName: new FormControl('', [ Validators.required ]),
            studyGroupName: new FormControl('', [ Validators.required ]),
        });
        this._selectScheduleGroupForm?.get('studySpecName')?.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            this.handleEmitStudyGroupsQuery('');
            this._selectScheduleGroupForm?.get('studyGroupName')?.patchValue('');
            this._groupsVisibility = false;
        });
        this._selectScheduleGroupForm.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            if (this._serverError !== '') {
                this._store.dispatch(NgrxAction_SMA.__clearServerErrorMessage());
            }
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._store.dispatch(NgrxAction_SMA.__clearConvertScheduleData());
        this._store
            .pipe(takeUntil(this._unsubscribe), select(NgrxSelectro_SES.sel_userConnectedDepartment))
            .subscribe(d => this._userDepartment = d);
        this.handleEmitStudySpecQuery('');
        this.handleEmitStudyGroupsQuery('');
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleSubmitSelectScheduleGroup(): void {
        const schedData: CmsScheduleConvertReqDataModel = this._selectScheduleGroupForm.getRawValue();
        schedData.departmentName = this._userDepartment;
        this._store.dispatch(NgrxAction_SMA.__convertScheduleData({ schedData }));
    };

    public handleShowScheduleGroups(): void {
        this.handleEmitStudyGroupsQuery('');
        this._groupsVisibility = true;
    };

    public handleEmitStudyGroupsQuery(studyGroup: string): void {
        this._serviceGET.getQueryGroupsBaseDeptAndSpec(
            studyGroup,
            this._userDepartment,
            this._selectScheduleGroupForm.get('studySpecName')!.value
        )
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => this._allScheduleGroups = q.dataElements);
    };

    public handleEmitStudySpecQuery(studySpecName: string): void {
        this._serviceGET
            .getQueryStudySpecsBasedDeptList(studySpecName, this._userDepartment)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(r => this._allStudyTypes = r.dataElements);
    };
}