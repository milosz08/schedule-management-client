/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleActivity } from '~/cms-editor-module/models/schedule-activity.model';
import {
  ConvertFromNamesToTupleRequest,
  ConvertToTupleResponse,
} from '~/cms-editor-module/models/schedule-convert.model';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';
import {
  AvailableDataModel,
  NameWithId,
} from '~/shared-module/types/drop-lists-data.type';

@Injectable()
export class ScheduleActivityHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  publishScheduleActivity$(req: ScheduleActivity): Observable<BaseMessage> {
    return this._httpClient.post<BaseMessage>(
      `${this._apiUrl}/api/v1/schedulesubject`,
      req
    );
  }

  convertFromNamesToTuple$(
    req: ConvertFromNamesToTupleRequest
  ): Observable<ConvertToTupleResponse> {
    return this._httpClient.post<ConvertToTupleResponse>(
      `${this._apiUrl}/api/v1/helper/schedule/name/to/tuple`,
      req
    );
  }

  getStudyRoomsBaseDepartment$(deptId: number): Observable<NameWithId[]> {
    return this._httpClient.get<NameWithId[]>(
      `${this._apiUrl}/api/v1/studyroom/dept/${deptId}`
    );
  }

  getTeachersBaseDeptAndSubject$(
    deptId: number,
    subjectName: string
  ): Observable<NameWithId[]> {
    return this._httpClient.get<NameWithId[]>(
      `${this._apiUrl}/api/v1/user/teacher/dept/${deptId}/all`,
      { params: { subjectName } }
    );
  }

  getScheduleSubjectTypes$(
    subjectTypeName: string
  ): Observable<AvailableDataModel<string>> {
    return this._httpClient.get<AvailableDataModel<string>>(
      `${this._apiUrl}/api/v1/helper/subject/type/all`,
      { params: { subjectTypeName } }
    );
  }
}
