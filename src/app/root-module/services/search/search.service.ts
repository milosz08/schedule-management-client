/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Observable,
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { SearchQueryRes } from '~/root-module/models/search-query.model';
import { AbstractFetchProvider } from '~/shared-module/service/abstract-fetch-provider';
import { ScheduleHttpClientService } from '../schedule-http-client/schedule-http-client.service';

@Injectable()
export class SearchService extends AbstractFetchProvider {
  constructor(
    private readonly _scheduleHttpClientService: ScheduleHttpClientService
  ) {
    super();
  }

  searchScheduleData$(form: FormGroup): Observable<SearchQueryRes[]> {
    return form.valueChanges.pipe(
      filter(query => query.searchQuery),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => {
        this.setFetching(true);
        return this._scheduleHttpClientService.getScheduleSearchData$(query);
      }),
      delay(500),
      tap(() => this.setFetching(false)),
      catchError(err => {
        this.setFetching(false);
        return throwError(() => err);
      })
    );
  }
}
