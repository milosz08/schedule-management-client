/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AddUpdateStudySubjectRequest,
  AddUpdateStudySubjectResponse,
  StudySubjectData,
  StudySubjectDetailsData,
} from '~/cms-admin-module/models/study-subject.model';
import { Pagination } from '~/cms-module/models/pagination.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class StudySubjectHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getStudySubjects$(params: Params): Observable<Pagination<StudySubjectData>> {
    return this._httpClient.get<Pagination<StudySubjectData>>(
      `${this._apiUrl}/api/v1/studysubject/all/pageable`,
      { params }
    );
  }

  getStudySubjectDetails$(id: number): Observable<StudySubjectDetailsData> {
    return this._httpClient.get<StudySubjectDetailsData>(
      `${this._apiUrl}/api/v1/studysubject/${id}/details`
    );
  }

  createNewStudySubject$(
    req: AddUpdateStudySubjectRequest
  ): Observable<AddUpdateStudySubjectResponse> {
    return this._httpClient.post<AddUpdateStudySubjectResponse>(
      `${this._apiUrl}/api/v1/studysubject`,
      req
    );
  }

  updateStudySubject$(
    id: number,
    req: AddUpdateStudySubjectRequest
  ): Observable<AddUpdateStudySubjectResponse> {
    return this._httpClient.put<AddUpdateStudySubjectResponse>(
      `${this._apiUrl}/api/v1/studysubject/${id}`,
      req
    );
  }
}
