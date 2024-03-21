/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { FilterBlockState } from '~/shared-module/types/filter-block-state.type';
import { ScheduleFilterData } from '~/shared-module/types/schedule-entity.type';
import { ScheduleCanvasService } from '../schedule-canvas/schedule-canvas.service';
import { ScheduleHttpClientService } from '../schedule-http-client/schedule-http-client.service';

@Injectable()
export class ScheduleFilterService {
  private readonly _showAllLabel = 'Pokaż wszystko';

  private _filterBlockState$ = new BehaviorSubject<FilterBlockState>('none');
  private _yearsData$ = new BehaviorSubject<string[]>([]);
  private _weeksData$ = new BehaviorSubject<string[]>([]);

  private _yearCount = 0;
  private _weekCount = 0;

  constructor(
    private readonly _scheduleHttpClientService: ScheduleHttpClientService,
    private readonly _scheduleCanvasService: ScheduleCanvasService
  ) {}

  toggleButtonsState$(): Observable<null> {
    return this._scheduleCanvasService.week$.pipe(
      withLatestFrom(this._weeksData$),
      map(([week, weeks]) => {
        this.determinateButtonsBlock(weeks, week);
        return null;
      })
    );
  }

  fetchFormDates$(formData: FormGroup): Observable<null> {
    return this._scheduleCanvasService.year$.pipe(
      tap(() => this._filterBlockState$.next('all')),
      tap(() => this._scheduleCanvasService.setRefetching(true)),
      switchMap(() => this._scheduleHttpClientService.getScheduleYears$()),
      switchMap(years => {
        this._yearsData$.next(years);
        const yearsRange = formData.get('selectedStudyYear')?.value;
        if (yearsRange) {
          const [startYear, endYear] = yearsRange.split('/');
          return this._scheduleHttpClientService.getWeeksBaseYear$(
            startYear,
            endYear
          );
        }
        return of([]);
      }),
      map(weeks => [this._showAllLabel].concat(weeks)),
      map(weeks => {
        this._weeksData$.next(weeks);
        this.determinateButtonsBlock(
          weeks,
          formData.get('selectedWeekData')?.value
        );
        this._scheduleCanvasService.setRefetching(false);
        return null;
      })
    );
  }

  toNextWeek(formData: FormGroup): void {
    const weeks = this.convertWeekDataToNumbers();
    if (
      weeks.some(
        e => e.year === this._yearCount && e.week === this._weekCount + 1
      )
    ) {
      this._weekCount++;
    } else {
      const onlyWithSingleCurrYear = weeks.filter(
        e => e.year === this._yearCount + 1
      );
      if (onlyWithSingleCurrYear.length !== 0) {
        this._yearCount++;
        const onlyWithSingleYear = weeks.filter(
          e => e.year === this._yearCount
        );
        this._weekCount = onlyWithSingleYear[0].week!;
      } else {
        this._filterBlockState$.next('next');
      }
    }
    this.patchFormData(formData);
  }

  toPrevWeek(formData: FormGroup): void {
    const weeks = this.convertWeekDataToNumbers();
    if (
      weeks.some(
        e => e.year === this._yearCount && e.week === this._weekCount - 1
      )
    ) {
      this._weekCount--;
    } else {
      const onlyWithSingleCurrYear = weeks.filter(
        e => e.year === this._yearCount - 1
      );
      if (onlyWithSingleCurrYear.length !== 0) {
        this._yearCount--;
        const onlyWithSingleYear = weeks.filter(
          e => e.year === this._yearCount
        );
        this._weekCount =
          onlyWithSingleYear[onlyWithSingleYear.length - 1].week!;
      } else {
        this._filterBlockState$.next('prev');
      }
    }
    this.patchFormData(formData);
  }

  private determinateButtonsBlock(weeks: string[], weeksRange: string): void {
    let blockOption: FilterBlockState = 'none';
    if (weeksRange === this._showAllLabel) {
      blockOption = 'all';
    } else {
      if (weeksRange === weeks[1]) {
        blockOption = 'prev';
      } else if (weeksRange === weeks[weeks.length - 1]) {
        blockOption = 'next';
      }
      const [year, week] = weeksRange
        .substring(weeksRange.indexOf('(') + 1, weeksRange.length - 1)
        .split(',');
      this._weekCount = Number(week);
      this._yearCount = Number(year);
    }
    this._filterBlockState$.next(blockOption);
  }

  private patchFormData(formData: FormGroup): void {
    const control = formData.get('selectedWeekData');
    if (control && control.value !== this._showAllLabel) {
      control.patchValue(
        this._weeksData$.value.find(weekData => {
          const [year, week] = weekData
            .substring(weekData.indexOf('(') + 1, weekData.length - 1)
            .split(',');
          return (
            Number(year) === this._yearCount && Number(week) === this._weekCount
          );
        })
      );
    }
  }

  private convertWeekDataToNumbers(): ScheduleFilterData[] {
    return this._weeksData$.value.map(weeks => {
      const [year, week] = weeks
        .substring(weeks.indexOf('(') + 1, weeks.length - 1)
        .split(',');
      if (weeks !== this._showAllLabel) {
        return { year: Number(year), week: Number(week) };
      }
      return { year: null, week: null };
    });
  }

  get isBlockPrev$(): Observable<boolean> {
    return this._filterBlockState$.pipe(
      map(state => state === 'all' || state === 'prev')
    );
  }
  get isBlockNext$(): Observable<boolean> {
    return this._filterBlockState$.pipe(
      map(state => state === 'all' || state === 'next')
    );
  }
  get yearsData$(): Observable<string[]> {
    return this._yearsData$.asObservable();
  }
  get weeksData$(): Observable<string[]> {
    return this._weeksData$.asObservable();
  }
}
