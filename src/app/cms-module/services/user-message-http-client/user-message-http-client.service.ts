import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from '~/cms-module/models/pagination.model';
import {
  UserMessageData,
  UserMessageDetailsData,
} from '~/cms-module/models/user-message.model';
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
      `${this._apiUrl}/v1/contactmessage/user/all/pageable`,
      { params }
    );
  }

  getUserMessageDetails$(id: number): Observable<UserMessageDetailsData> {
    return this._httpClient.get<UserMessageDetailsData>(
      `${this._apiUrl}/v1/contactmessage/${id}/details`
    );
  }
}
