/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { StudySpecializationData } from '~/cms-admin-module/models/study-spec.model';
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
}
