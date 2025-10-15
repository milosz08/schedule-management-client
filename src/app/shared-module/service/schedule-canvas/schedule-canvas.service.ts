import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import equal from 'array-equal';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  filter,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ScheduleDataRes } from '~/shared-module/models/schedule-data.model';
import { FetchingState } from '~/shared-module/types/fetching-state.type';
import {
  ErrorReason,
  RouteManager,
  ScheduleEntity,
} from '~/shared-module/types/schedule-entity.type';
import {
  getCurrentStudyYear,
  getCurrentWeek,
} from '~/shared-module/utils/date.utils';
import { AbstractLoadingProvider } from '../abstract-loading-provider';
import { ScheduleHttpClientService } from '../schedule-http-client/schedule-http-client.service';

@Injectable()
export class ScheduleCanvasService extends AbstractLoadingProvider {
  static readonly ROUTE_MANAGER_QUERY_MAP: RouteManager = {
    group: ['deptId', 'specId', 'groupId'],
    employer: ['deptId', 'cathId', 'employerId'],
    room: ['deptId', 'cathId', 'roomId'],
  };

  private _onErrorMessage$ = new BehaviorSubject<string>('');
  private _fetchingState$ = new BehaviorSubject<FetchingState>('fetching');
  private _errorReason$ = new BehaviorSubject<ErrorReason>('none');
  private _retryObserver$ = new BehaviorSubject<null>(null);
  private _scheduleType$ = new BehaviorSubject<ScheduleEntity>('none');
  private _isRefetching$ = new BehaviorSubject<boolean>(false);

  private _year$ = new BehaviorSubject<string>(getCurrentStudyYear());
  private _week$ = new BehaviorSubject<string>(getCurrentWeek());

  constructor(
    private readonly _scheduleHttpClientService: ScheduleHttpClientService
  ) {
    super();
  }

  saveScheduleFetchType$(
    form: FormGroup,
    route$: ActivatedRoute,
    typeFor?: keyof typeof ScheduleCanvasService.ROUTE_MANAGER_QUERY_MAP
  ): Observable<ScheduleDataRes> {
    return combineLatest([
      route$.queryParamMap,
      this._week$,
      this._retryObserver$,
    ]).pipe(
      tap(() => this.setRefetching(true)),
      map(([queryParamMap, week]) => ({
        scheduleType: queryParamMap.get('for') || typeFor,
        queryParams: queryParamMap.keys
          .filter(key => key !== 'for')
          .reduce(
            (acc, key) => ({ ...acc, [key]: queryParamMap.get(key) }),
            {}
          ) as ParamMap,
        week,
        year: form.get('selectedStudyYear')!.value,
      })),
      filter(({ scheduleType, queryParams }) => {
        if (!scheduleType || !queryParams) {
          return false;
        }
        const validScheduleType = Object.keys(
          ScheduleCanvasService.ROUTE_MANAGER_QUERY_MAP
        ).includes(scheduleType!);
        const validQueryParams = equal(
          ScheduleCanvasService.ROUTE_MANAGER_QUERY_MAP[
            scheduleType as Exclude<ScheduleEntity, 'none'>
          ],
          Object.keys(queryParams)
        );
        if (!validScheduleType || !validQueryParams) {
          this.onFailure('Nieprawidłowe parametry wejściowe.', 'route');
          return false;
        }
        this._scheduleType$.next(scheduleType as ScheduleEntity);
        return true;
      }),
      map(values => ({
        ...values,
        scheduleType: values.scheduleType as ScheduleEntity,
      })),
      switchMap(({ scheduleType, queryParams, week, year }) =>
        this.fetchScheduleData$(week, year, scheduleType, queryParams)
      )
    );
  }

  fetchScheduleData$(
    selectedWeek: string,
    selectedYear: string,
    parameter: ScheduleEntity,
    queryParams: Params
  ): Observable<ScheduleDataRes> {
    return this._scheduleHttpClientService
      .getScheduleBaseParameter$(parameter, queryParams, {
        selectedYears: selectedYear,
        weekInputOptions: selectedWeek,
      })
      .pipe(
        tap(() => {
          this.setLoading(false);
          this.setRefetching(false);
          this._errorReason$.next('none');
          this._fetchingState$.next('success');
        }),
        catchError(() => {
          this.setLoading(false);
          this.onFailure('Wystąpił błąd podczas pobierania danych.', 'unknow');
          return of();
        })
      );
  }

  retryFetch(): void {
    this.setLoading(true);
    this._retryObserver$.next(null);
  }

  setWeek(week: string): void {
    this._week$.next(week);
  }

  setYear(year: string): void {
    this._year$.next(year);
  }

  setRefetching(isRefetching: boolean): void {
    this._isRefetching$.next(isRefetching);
  }

  private onFailure(message: string, reason: ErrorReason): void {
    this._onErrorMessage$.next(message);
    this._errorReason$.next(reason);
    this._fetchingState$.next('failure');
  }

  get retryFetchEnabled$(): Observable<boolean> {
    return this._errorReason$.pipe(map(reason => reason === 'unknow'));
  }
  get onErrorMessage$(): Observable<string> {
    return this._onErrorMessage$.asObservable();
  }
  get fetchingState$(): Observable<FetchingState> {
    return this._fetchingState$.asObservable();
  }
  get scheduleType$(): Observable<ScheduleEntity> {
    return this._scheduleType$.asObservable();
  }
  get week$(): Observable<string> {
    return this._week$.asObservable();
  }
  get year$(): Observable<string> {
    return this._year$.asObservable();
  }
  get isRefetching$(): Observable<boolean> {
    return this._isRefetching$.asObservable();
  }
  get buttonsBlocked$(): Observable<boolean> {
    return combineLatest([this._isLoading$, this._isRefetching$]).pipe(
      map(loadingStates => loadingStates.some(state => state))
    );
  }
}
