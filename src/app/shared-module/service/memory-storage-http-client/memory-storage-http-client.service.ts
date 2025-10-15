import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  SavedAccountRes,
  SavedAccountsReq,
} from '~/shared-module/models/memory-storage.model';
import { AbstractHttpClientProvider } from '../abstract-http-client-provider';

@Injectable({ providedIn: 'root' })
export class MemoryStorageHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  checkAccounts$(req: SavedAccountsReq): Observable<SavedAccountRes[]> {
    return this._httpClient.patch<SavedAccountRes[]>(
      `${this._apiUrl}/v1/memorystorage/accounts/check`,
      req
    );
  }
}
