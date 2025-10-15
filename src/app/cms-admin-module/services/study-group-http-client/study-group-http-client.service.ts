import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AddUpdateStudyGroupRequest,
  AddUpdateStudyGroupResponse,
  StudyGroupData,
} from '~/cms-admin-module/models/study-group.model';
import { Pagination } from '~/cms-module/models/pagination.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';
import {
  AvailableDataModel,
  NameWithId,
} from '~/shared-module/types/drop-lists-data.type';

@Injectable()
export class StudyGroupHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getSemesters$(): Observable<AvailableDataModel<NameWithId>> {
    return this._httpClient.get<AvailableDataModel<NameWithId>>(
      `${this._apiUrl}/v1/helper/semester/all`
    );
  }

  getStudyGroups$(params: Params): Observable<Pagination<StudyGroupData>> {
    return this._httpClient.get<Pagination<StudyGroupData>>(
      `${this._apiUrl}/v1/studygroup/all/pageable`,
      { params }
    );
  }

  createNewStudyGroup$(
    req: AddUpdateStudyGroupRequest
  ): Observable<AddUpdateStudyGroupResponse[]> {
    return this._httpClient.post<AddUpdateStudyGroupResponse[]>(
      `${this._apiUrl}/v1/studygroup`,
      req
    );
  }
}
