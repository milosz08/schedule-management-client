/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  SearchQueryReq,
  SearchQueryRes,
} from '~/root-module/models/search-query.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable({ providedIn: 'root' })
export class ScheduleHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getScheduleSearchData$(req: SearchQueryReq): Observable<SearchQueryRes[]> {
    return this._httpClient.get<SearchQueryRes[]>(
      `${this._apiUrl}/api/v1/searchcontent`,
      { params: { ...req } }
    );
  }
}
