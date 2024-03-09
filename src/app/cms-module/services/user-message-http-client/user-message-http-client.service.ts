/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from '~/cms-module/models/pagination.model';
import { UserMessageData } from '~/cms-module/models/user-message.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class UserMessageHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getUserMessagesBaseRole$(
    params: Params
  ): Observable<Pagination<UserMessageData>> {
    return this._httpClient.get<Pagination<UserMessageData>>(
      `${this._apiUrl}/api/v1/contactmessage/user/all/pageable`,
      { params }
    );
  }
}
