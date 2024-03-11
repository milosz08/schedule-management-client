/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AddUpdateUserRequest,
  AddUpdateUserResponse,
  UserData,
} from '~/cms-admin-module/models/user.model';
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

  createNewUser$(req: AddUpdateUserRequest): Observable<AddUpdateUserResponse> {
    return this._httpClient.post<AddUpdateUserResponse>(
      `${this._apiUrl}/api/v1/auth/register`,
      req
    );
  }

  updateUser$(
    id: number,
    isUpdateEmailPass: boolean,
    req: AddUpdateUserRequest
  ): Observable<AddUpdateUserResponse> {
    return this._httpClient.put<AddUpdateUserResponse>(
      `${this._apiUrl}/api/v1/user/${id}`,
      req,
      { params: { isUpdateEmailPass } }
    );
  }
}
