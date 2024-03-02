/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { ScheduleDataRes } from '~/shared-module/models/schedule-data.model';
import { ScheduleCanvasService } from '~/shared-module/service/schedule-canvas/schedule-canvas.service';
import { ScheduleFilterService } from '~/shared-module/service/schedule-filter/schedule-filter.service';
import {
  fabricateHoursTable,
  getCurrentStudyYear,
  getCurrentWeek,
} from '~/shared-module/utils/date.utils';

@Component({
  selector: 'app-selected-schedule-page',
  templateUrl: './selected-schedule-page.component.html',
  providers: [ScheduleCanvasService, ScheduleFilterService],
})
export class SelectedSchedulePageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  hoursData = fabricateHoursTable();

  filterForm: FormGroup;
  scheduleData: ScheduleDataRes | undefined;

  onErrorMessage$ = this._scheduleCanvasService.onErrorMessage$;
  fetchingState$ = this._scheduleCanvasService.fetchingState$;
  isLoading$ = this._scheduleCanvasService.isLoading$;
  retryFetchEnabled$ = this._scheduleCanvasService.retryFetchEnabled$;
  scheduleType$ = this._scheduleCanvasService.scheduleType$;
  week$ = this._scheduleCanvasService.week$;
  isRefetching$ = this._scheduleCanvasService.isRefetching$;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _scheduleCanvasService: ScheduleCanvasService
  ) {
    super();
    this.filterForm = new FormGroup({
      selectedWeekData: new FormControl(getCurrentWeek(), [
        Validators.required,
      ]),
      selectedStudyYear: new FormControl(getCurrentStudyYear(), [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._scheduleCanvasService.saveScheduleFetchType$(
        this.filterForm,
        this._route
      )
    ).subscribe(scheduleData => (this.scheduleData = scheduleData));
    this.wrapAsObservable$(
      this.filterForm.get('selectedWeekData')!.valueChanges
    ).subscribe(weekData => this._scheduleCanvasService.setWeek(weekData));
    this.wrapAsObservable$(
      this.filterForm.get('selectedStudyYear')!.valueChanges
    ).subscribe(yearData => this._scheduleCanvasService.setYear(yearData));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  areSomeDataExist(isEmpty: boolean): boolean {
    return (
      !this.scheduleData?.scheduleCanvasData.every(
        d => !d.weekdayData.length
      ) && isEmpty
    );
  }

  handleLoadAgain(): void {
    this._scheduleCanvasService.retryFetch();
  }
}
