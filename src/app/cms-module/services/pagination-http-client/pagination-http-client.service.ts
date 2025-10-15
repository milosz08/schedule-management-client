import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class PaginationHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getPaginationSizes$(): Observable<number[]> {
    return this._httpClient.get<number[]>(
      `${this._apiUrl}/v1/helper/pagination/all`
    );
  }
}
