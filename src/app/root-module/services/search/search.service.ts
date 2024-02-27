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
import { SearchQueryRes } from '~/shared-module/models/search-query.model';
import { AbstractLoadingProvider } from '~/shared-module/service/abstract-loading-provider';
import { ScheduleHttpClientService } from '~/shared-module/service/schedule-http-client/schedule-http-client.service';

@Injectable()
export class SearchService extends AbstractLoadingProvider {
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
        this.setLoading(true);
        return this._scheduleHttpClientService.getScheduleSearchData$(query);
      }),
      delay(500),
      tap(() => this.setLoading(false)),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
