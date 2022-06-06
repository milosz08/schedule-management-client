/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: selected-schedule-page.component.ts
 * Last modified | Ostatnia modyfikacja: 24/05/2022, 23:06
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

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { catchError, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MiscHelper } from '../../../../utils/misc.helper';
import { ScheduleDataRes, ScheduleFilteringData, ScheduleGroups } from '../../../../types/schedule-data.type';

import * as NgrxAction_SHA from '../../../shared-module/ngrx-store/shared-ngrx-store/shared.actions';
import { SharedReducerType } from '../../../shared-module/ngrx-store/shared-ngrx-store/shared.selectors';

import { ScheduleDataGetConnectorService } from '../../../../services/schedule-data-get-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku wybranego planu zajęć na podsatwie parametrów ścieżki URL.
 */

@Component({
    selector: 'app-selected-schedule-page',
    templateUrl: './selected-schedule-page.component.html',
    styleUrls: [],
    host: { class: 'app__main-flex-columned' },
    providers: [ ScheduleDataGetConnectorService ],
})
export class SelectedSchedulePageComponent implements OnDestroy {

    public _serverError: string = '';
    public _tableLoading: boolean = true;

    public _scheduleType: string = '';
    public _scheduleData: ScheduleDataRes<ScheduleGroups> = new ScheduleDataRes<ScheduleGroups>();
    public _hoursData: Array<number> = MiscHelper._hoursTable;

    public _selectedFilterForm: FormGroup;
    public _selectedWeek: string = MiscHelper.__currentWeekData;
    public _selectedYear: string = MiscHelper.__currentStudyYear;

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _route: ActivatedRoute,
        private _store: Store<SharedReducerType>,
        private _scheduleGET: ScheduleDataGetConnectorService,
    ) {
        this._selectedFilterForm = new FormGroup({
            selectedWeekData: new FormControl(this._selectedWeek, [ Validators.required ]),
            selectedStudyYear: new FormControl(this._selectedYear, [ Validators.required ]),
        });
        this._route.params.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            this._tableLoading = true;
            this._scheduleType = String(this._route.snapshot.paramMap.get('scheduleType'));
        });
        this._route.queryParams.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            if (![ 'groups', 'employeers', 'rooms' ].includes(this._scheduleType)) {
                this._serverError = 'Skontaktuj się z administratorem systemu';
            } else {
                this._serverError = '';
                this.loadTableContent(this._route.snapshot.queryParams,
                    new ScheduleFilteringData(this._selectedWeek, this._selectedYear));
            }
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    private loadTableContent(paramsToNumbers: { [key: string]: string }, filter: ScheduleFilteringData): void {
        const params = JSON.parse(JSON.stringify(paramsToNumbers));
        Object.keys(params).forEach(key => params[key] = parseInt(params[key]));
        this._tableLoading = true;
        this._scheduleGET.getSheduleBaseType(this._scheduleType, params, filter)
            .pipe(
                takeUntil(this._unsubscribe),
                catchError(({ error }) => {
                    this._tableLoading = false;
                    if (error) {
                        this._serverError = error.message;
                    } else {
                        this._serverError = 'Skontaktuj się z administratorem systemu';
                    }
                    return of(null);
                })
            )
            .subscribe(data => {
                this._tableLoading = false;
                this._scheduleData = data;
                this._selectedWeek = this._scheduleData.currentChooseWeek;
                this._store.dispatch(NgrxAction_SHA.__addNewScheduleData({ scheduleData: this._scheduleData,
                    param: String(this._route.snapshot.paramMap.get('scheduleType')) }));
            });
    };

    public ifSomeDataExist(ifEmpty: boolean): boolean {
        return !this._scheduleData.scheduleCanvasData.every(d => d.weekdayData.length === 0) && ifEmpty;
    };

    public handleEmitNewScheduleQuery(payload: string): void {
        this.loadTableContent(this._route.snapshot.queryParams,new ScheduleFilteringData(
            payload, this._selectedFilterForm.get('selectedStudyYear')?.value));
    };
}