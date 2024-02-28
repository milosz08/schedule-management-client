/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  tap,
  throwError,
} from 'rxjs';
import {
  ScheduleNavList,
  ScheduleNavParams,
} from '~/root-module/models/schedule-nav-list.model';
import { AbstractLoadingProvider } from '~/shared-module/service/abstract-loading-provider';
import { ScheduleNavigationHttpClientService } from '../schedule-navigation-http-client/schedule-navigation-http-client.service';

@Injectable()
export class ScheduleNavigationService extends AbstractLoadingProvider {
  constructor(
    private readonly _scheduleNavigationHttpClientService: ScheduleNavigationHttpClientService
  ) {
    super();
  }

  fetchDepartments$(): Observable<ScheduleNavList[]> {
    this.setLoading(true);
    return this._scheduleNavigationHttpClientService.getDepartments$().pipe(
      delay(500),
      tap(() => this.setLoading(false)),
      catchError(() => {
        this.setLoading(false);
        return [];
      })
    );
  }

  fetchTreeNavigationData$(
    dataFetchCallback$: (
      params: ScheduleNavParams
    ) => Observable<ScheduleNavList[]>,
    params: ScheduleNavParams,
    isLoading$: BehaviorSubject<boolean>
  ) {
    isLoading$.next(true);
    return dataFetchCallback$(params).pipe(
      delay(500),
      tap(() => isLoading$.next(false)),
      catchError(() => {
        isLoading$.next(false);
        return throwError(() => []);
      })
    );
  }
}
