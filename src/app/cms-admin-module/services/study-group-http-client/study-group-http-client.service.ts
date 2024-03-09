/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { StudyGroupData } from '~/cms-admin-module/models/entities.model';
import { Pagination } from '~/cms-module/models/pagination.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class StudyGroupHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getStudyGroups$(params: Params): Observable<Pagination<StudyGroupData>> {
    return this._httpClient.get<Pagination<StudyGroupData>>(
      `${this._apiUrl}/api/v1/studygroup/all/pageable`,
      { params }
    );
  }
}
