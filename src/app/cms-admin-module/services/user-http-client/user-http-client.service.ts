/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { UserData } from '~/cms-admin-module/models/entities.model';
import { Pagination } from '~/cms-module/models/pagination.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class UserHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getUsers$(params: Params): Observable<Pagination<UserData>> {
    return this._httpClient.get<Pagination<UserData>>(
      `${this._apiUrl}/api/v1/user/all/pageable`,
      { params }
    );
  }
}
