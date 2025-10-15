import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ScheduleDataRes } from '~/shared-module/models/schedule-data.model';
import { ScheduleFilter } from '~/shared-module/models/schedule-filter.model';
import { ScheduleSubjectDetails } from '~/shared-module/models/schedule-subject-details.model';
import {
  SearchQueryReq,
  SearchQueryRes,
} from '~/shared-module/models/search-query.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';
import { ScheduleEntity } from '~/shared-module/types/schedule-entity.type';

@Injectable({ providedIn: 'root' })
export class ScheduleHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getScheduleSearchData$(req: SearchQueryReq): Observable<SearchQueryRes[]> {
    return this._httpClient.get<SearchQueryRes[]>(
      `${this._apiUrl}/api/v1/searchcontent`,
      { params: req }
    );
  }

  getScheduleSubjectDetails$(
    schedSubjId: number
  ): Observable<ScheduleSubjectDetails> {
    return this._httpClient.get<ScheduleSubjectDetails>(
      `${this._apiUrl}/api/v1/schedulesubject/${schedSubjId}/details`
    );
  }

  getScheduleBaseParameter$(
    parameter: ScheduleEntity,
    params: Params,
    filter: ScheduleFilter
  ): Observable<ScheduleDataRes> {
    return this._httpClient.post<ScheduleDataRes>(
      `${this._apiUrl}/api/v1/schedulesubject/all/filter/${parameter}`,
      filter,
      { params }
    );
  }

  getScheduleYears$(): Observable<string[]> {
    return this._httpClient.get<string[]>(
      `${this._apiUrl}/api/v1/timemanagement/study/years`
    );
  }

  getWeeksBaseYear$(fromYear: number, toYear: number): Observable<string[]> {
    return this._httpClient.get<string[]>(
      `${this._apiUrl}/api/v1/timemanagement/weekdata/from/year/${fromYear}/to/year/${toYear}`
    );
  }
}
