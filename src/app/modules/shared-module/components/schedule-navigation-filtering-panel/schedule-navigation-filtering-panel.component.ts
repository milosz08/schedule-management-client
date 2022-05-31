/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-navigation-filtering-panel.component.ts
 * Last modified | Ostatnia modyfikacja: 31/05/2022, 00:30
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

import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CmsGetAllConnectorService } from '../../../cms-panel-module/services/cms-get-all-connector.service';
import { ScheduleDataGetConnectorService } from '../../../../services/schedule-data-get-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie widoku nawigacji planu (przechodzenie pomiędzy tygodniami oraz latami).
 */

@Component({
    selector: 'app-schedule-navigation-filtering-panel',
    templateUrl: './schedule-navigation-filtering-panel.component.html',
    styleUrls: [ './schedule-navigation-filtering-panel.component.scss' ],
    providers: [ CmsGetAllConnectorService ],
})
export class ScheduleNavigationFilteringPanelComponent implements OnDestroy, OnChanges {

    public _allWeeksData: Array<string> = new Array<string>();
    public _allYearsData: Array<string> = new Array<string>();

    public _disableButtons: boolean = false;
    public _disablePrevButton: boolean = false;
    public _disableNextButton: boolean = false;

    private _weekIncrementor: number = 0;
    private _currentYear: number = 0;

    private _unsubscribe: Subject<void> = new Subject();

    @Input() public _selectedWeek: string = '';
    @Input() public _selectedFilterForm!: FormGroup;
    @Output() public _emitGetParameters: EventEmitter<string> = new EventEmitter<string>();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _scheduleServiceGET: ScheduleDataGetConnectorService,
    ) {
        this._scheduleServiceGET
            .getAllYearsData()
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => {
                this._allYearsData = q;
                const [ startYear, endYear ] = this._selectedFilterForm.get('selectedStudyYear')?.value.split('/');
                this._scheduleServiceGET
                    .getAllWeeksDataBaseYear(startYear, endYear)
                    .pipe(takeUntil(this._unsubscribe))
                    .subscribe(q => {
                        this._allWeeksData = [ 'Pokaż wszystko' ].concat(q);
                        const data = this._selectedFilterForm.get('selectedWeekData')?.value;
                        this._disableButtons = data === 'Pokaż wszystko';
                        this._disablePrevButton = data === this._allWeeksData[1];
                        this._disableNextButton = data === this._allWeeksData[this._allWeeksData.length - 1];
                    });
            });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public ngOnChanges(changes: SimpleChanges): void {
        const [ year, weekNumber ] = this._selectedWeek
            .substring(this._selectedWeek.indexOf('(') + 1, this._selectedWeek.length - 1).split(',');
        this._weekIncrementor = Number(weekNumber);
        this._currentYear = Number(year);
    };

    public mappedWeekDataFromStringToObject(): Array<{ year: number | null, weekNumber: number | null }> {
        return this._allWeeksData.map(data => {
            const [ year, weekNumber ] = data.substring(data.indexOf('(') + 1, data.length - 1).split(',');
            if (data !== 'Pokaż wszystko') {
                return { year: Number(year), weekNumber: Number(weekNumber) }
            }
            return { year: null, weekNumber: null };
        });
    };

    public handleGotoPrevWeek(): void {
        const mappedData = this.mappedWeekDataFromStringToObject();
        this._disableNextButton = false;
        if (mappedData.some(e => e.year === this._currentYear && e.weekNumber === this._weekIncrementor - 1)) {
            this._weekIncrementor--;
        } else {
            const onlyWithSingleCurrYear = mappedData.filter(e => e.year === this._currentYear - 1);
            if (onlyWithSingleCurrYear.length !== 0) {
                this._currentYear--;
                const onlyWithSingleYear = mappedData.filter(e => e.year === this._currentYear);
                this._weekIncrementor = onlyWithSingleYear[onlyWithSingleYear.length - 1].weekNumber!;
            } else {
                this._disablePrevButton = true;
            }
        }
        this.patchValues();
    };

    public handleGotoNextWeek(): void {
        const mappedData = this.mappedWeekDataFromStringToObject();
        this._disablePrevButton = false;
        if (mappedData.some(e => e.year === this._currentYear && e.weekNumber === this._weekIncrementor + 1)) {
            this._weekIncrementor++;
        } else {
            const onlyWithSingleCurrYear = mappedData.filter(e => e.year === this._currentYear + 1);
            if (onlyWithSingleCurrYear.length !== 0) {
                this._currentYear++;
                const onlyWithSingleYear = mappedData.filter(e => e.year === this._currentYear);
                this._weekIncrementor = onlyWithSingleYear[0].weekNumber!;
            } else {
                this._disableNextButton = true;
            }
        }
        this.patchValues();
    };

    public patchValues(): void {
        if (this._selectedFilterForm!.get('selectedWeekData')?.value !== 'Pokaż wszystko') {
            this._selectedFilterForm!.get('selectedWeekData')!.patchValue(this._allWeeksData.find(el => {
                const [ year, weekNumber ] = el.substring(el.indexOf('(') + 1, el.length - 1).split(',');
                return Number(year) === this._currentYear && Number(weekNumber) === this._weekIncrementor;
            }));
        }
        this._emitGetParameters.emit(this._selectedFilterForm.get('selectedWeekData')?.value);
    };

    public handleSubmitWeek(): void {
        const { selectedWeekData } = this._selectedFilterForm!.getRawValue();
        if (selectedWeekData !== 'Pokaż wszystko') {
            const [ year, weekNumber ] = selectedWeekData
                .substring(selectedWeekData.indexOf('(') + 1, selectedWeekData.length - 1).split(',');
            this._weekIncrementor = Number(weekNumber);
            this._currentYear = Number(year);
        }
        this.patchValues();
    };

    public handleGetAllWeeksBaseStudyYear(): void {
        const [ startYear, endYear ] = this._selectedFilterForm.get('selectedStudyYear')?.value.split('/');
        this._scheduleServiceGET
            .getAllWeeksDataBaseYear(startYear, endYear)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => {
                this._selectedFilterForm!.get('selectedWeekData')?.patchValue('Pokaż wszystko');
                this._allWeeksData = [ 'Pokaż wszystko' ].concat(q);
                this.patchValues();
            });
    };
}