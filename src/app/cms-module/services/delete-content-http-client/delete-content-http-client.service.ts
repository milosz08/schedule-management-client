import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredentials } from '~/cms-module/models/user-credentials.model';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class DeleteContentHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  deleteSelected$(
    ids: number[],
    endpoint: string,
    userCredentials: UserCredentials
  ): Observable<BaseMessage> {
    return this._httpClient.delete<BaseMessage>(
      `${this._apiUrl}/api/v1/${endpoint}/selected`,
      { body: { ids }, headers: this.prepareHeaders(userCredentials) }
    );
  }

  deleteAll$(
    endpoint: string,
    userCredentials: UserCredentials
  ): Observable<BaseMessage> {
    return this._httpClient.delete<BaseMessage>(
      `${this._apiUrl}/api/v1/${endpoint}/all`,
      { headers: this.prepareHeaders(userCredentials) }
    );
  }

  private prepareHeaders({ username, password }: UserCredentials): HttpHeaders {
    return new HttpHeaders({
      'X-UserName': username,
      'X-UserPassword': password,
    });
  }
}
