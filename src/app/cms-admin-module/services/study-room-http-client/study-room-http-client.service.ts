/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { StudyRoomData } from '~/cms-admin-module/models/entities.model';
import { Pagination } from '~/cms-module/models/pagination.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class StudyRoomHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getStudyRooms$(params: Params): Observable<Pagination<StudyRoomData>> {
    return this._httpClient.get<Pagination<StudyRoomData>>(
      `${this._apiUrl}/api/v1/studyroom/all/pageable`,
      { params }
    );
  }
}
