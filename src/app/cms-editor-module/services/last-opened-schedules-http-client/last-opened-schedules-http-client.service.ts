import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LastOpenedSchedule,
  LastOpenedScheduleReqDto,
  LastOpenedScheduleResDto,
} from '~/cms-editor-module/models/last-opened-schedule.model';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class LastOpenedSchedulesHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getAllLastOpenedSchedules$(): Observable<LastOpenedSchedule[]> {
    return this._httpClient.get<LastOpenedSchedule[]>(
      `${this._apiUrl}/v1/lastopenedschedules/all`
    );
  }

  appendLastOpenedSchedule$(
    reqDto: LastOpenedScheduleReqDto
  ): Observable<LastOpenedScheduleResDto> {
    return this._httpClient.post<LastOpenedScheduleResDto>(
      `${this._apiUrl}/v1/lastopenedschedules`,
      reqDto
    );
  }

  deleteSelectedLastOpenedSchedules$(ids: number[]): Observable<BaseMessage> {
    return this._httpClient.delete<BaseMessage>(
      `${this._apiUrl}/v1/lastopenedschedules/selected`,
      { body: { ids } }
    );
  }

  deleteAllLastOpenedSchedules$(): Observable<BaseMessage> {
    return this._httpClient.delete<BaseMessage>(
      `${this._apiUrl}/v1/lastopenedschedules/all`
    );
  }
}
