/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-cms-page.component.ts
 * Last modified | Ostatnia modyfikacja: 24/05/2022, 13:32
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
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { takeUntil } from 'rxjs/operators';
import { delay, Observable, Subject } from 'rxjs';

import { MiscHelper } from '../../../../utils/misc.helper';
import { AllCmsWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

import { NameWithId } from '../../models/cms-drop-lists-data.model';
import { CmsScheduleConvertFromIdsReqDataModel } from '../../models/cms-schedule-convert-data.model';

import { AvailableScheduleModalTypes } from '../../types/available-schedule-modal.types';
import { ScheduleDataRes, ScheduleFilteringData, ScheduleGroupQuery, ScheduleGroups } from '../../../../types/schedule-data.type';

import * as NgrxAction_SMA from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.actions';
import * as NgrxSelector_SMA from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.selectors';
import { ScheduleManipulatorReducerType } from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.selectors';

import { ScheduleDataGetConnectorService } from '../../../../services/schedule-data-get-connector.service';
import * as NgrxAction_MOD from '../../../shared-module/ngrx-store/modals-ngrx-store/modals.actions';
import { ApiConfigurerHelper } from '../../../../utils/api-configurer.helper';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku planu zajęć (z możliwością dodawania nowych treści).
 */

@Component({
    selector: 'app-schedule-cms-page',
    templateUrl: './schedule-cms-page.component.html',
    styleUrls: [ './schedule-cms-page.component.scss' ],
    providers: [ ScheduleDataGetConnectorService ],
})
export class ScheduleCmsPageComponent extends MetaWebContentHelper implements OnInit, OnDestroy {

    public _ifError$: Observable<string> = this._store.select(NgrxSelector_SMA.sel_ifFetchingError);

    public _tableLoading: boolean = true;
    public _scheduleData?: ScheduleDataRes<ScheduleGroups>;
    public _hoursData: Array<number> = MiscHelper._hoursTable;

    public _selectedFilterForm: FormGroup;
    public _selectedWeek: string = 'Pokaż wszystko';
    public _selectedYear: string = MiscHelper.__currentStudyYear;

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        titleService: Title,
        metaService: Meta,
        private _route: ActivatedRoute,
        private _endpoints: ApiConfigurerHelper,
        private _store: Store<ScheduleManipulatorReducerType>,
        private _scheduleGET: ScheduleDataGetConnectorService,
    ) {
        super(titleService, metaService, AllCmsWebpages.SCHEDULE);
        this._selectedFilterForm = new FormGroup({
            selectedStudyYear: new FormControl(this._selectedYear, [ Validators.required ]),
            selectedWeekData: new FormControl(this._selectedWeek, [ Validators.required ]),
        });
        this.loadAllScheduleSubjectsData(new ScheduleFilteringData(this._selectedWeek, this._selectedYear));
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        const { deptId, specId, groupId } = this._route.snapshot.queryParams;
        this.loadAllScheduleSubjectsData(new ScheduleFilteringData(this._selectedWeek, this._selectedYear));
        this._store.dispatch(NgrxAction_SMA.__convertScheduleDataReversed({
            schedData: new CmsScheduleConvertFromIdsReqDataModel(deptId, specId, groupId)
        }));
    };

    private loadAllScheduleSubjectsData(filter: ScheduleFilteringData): void {
        this._tableLoading = true;
        const { deptId, specId, groupId } = this._route.snapshot.queryParams;
        this._scheduleGET
            .getScheduleDataBaseGroup(new ScheduleGroupQuery(deptId, specId, groupId), filter)
            .pipe(
                delay(500),
                takeUntil(this._unsubscribe),
            )
            .subscribe(data => {
                this._tableLoading = false;
                this._scheduleData = data;
                this._selectedWeek = this._scheduleData.currentChooseWeek;
            });
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleOpenModalInsertingNewScheduleContent(selectedDay: NameWithId): void {
        this._store.dispatch(NgrxAction_SMA.__setModalOpen({ selectedDay, modalType: AvailableScheduleModalTypes.ADD }));
    };

    public handleClearAllScheduleBaseIds(): void {
        const allIdsToRemove = this._scheduleData?.scheduleCanvasData.map(d => d.weekdayData.map(d => d.scheduleSubjectId));
        const removeContentIds = allIdsToRemove!.reduce((prev, next) => prev.concat(next));
        this._store.dispatch(NgrxAction_MOD.__openRemoveContentModal({
            removeContentPath: this._endpoints.MASSIVE_DELETE_SCHEDULE_SUBJECTS, removeContentIds }));
    };

    public handleEmitNewScheduleQuery(payload: string): void {
        const inputValue = this._selectedFilterForm.get('selectedStudyYear')?.value;
        this.loadAllScheduleSubjectsData(new ScheduleFilteringData(payload, inputValue));
    };

    public ifSomeDataExist(ifEmpty: boolean): boolean {
        return !this._scheduleData?.scheduleCanvasData.every(d => d.weekdayData.length === 0) && ifEmpty;
    };
}