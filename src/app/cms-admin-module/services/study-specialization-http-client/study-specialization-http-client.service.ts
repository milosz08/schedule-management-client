/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AddUpdateStudySpecializationRequest,
  AddUpdateStudySpecializationResponse,
  StudySpecializationData,
  StudySpecializationDetailsData,
} from '~/cms-admin-module/models/study-spec.model';
import { Pagination } from '~/cms-module/models/pagination.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class StudySpecializationHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getStudySpecializations$(
    params: Params
  ): Observable<Pagination<StudySpecializationData>> {
    return this._httpClient.get<Pagination<StudySpecializationData>>(
      `${this._apiUrl}/api/v1/studyspec/all/pageable`,
      { params }
    );
  }

  getStudySpecializationDetails$(
    id: number
  ): Observable<StudySpecializationDetailsData> {
    return this._httpClient.get<StudySpecializationDetailsData>(
      `${this._apiUrl}/api/v1/studyspec/${id}/details`
    );
  }

  createNewStudySpecialization$(
    req: AddUpdateStudySpecializationRequest
  ): Observable<AddUpdateStudySpecializationResponse[]> {
    return this._httpClient.post<AddUpdateStudySpecializationResponse[]>(
      `${this._apiUrl}/api/v1/studyspec`,
      req
    );
  }

  updateStudySpecialization$(
    id: number,
    req: AddUpdateStudySpecializationRequest
  ): Observable<AddUpdateStudySpecializationResponse[]> {
    return this._httpClient.put<AddUpdateStudySpecializationResponse[]>(
      `${this._apiUrl}/api/v1/studyspec/${id}`,
      req
    );
  }
}
