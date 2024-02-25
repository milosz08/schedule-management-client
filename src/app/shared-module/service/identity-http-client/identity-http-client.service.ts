/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenLoginReq } from '~/shared-module/models/auto-login.model';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { LoginRes } from '~/shared-module/models/identity.model';
import {
  RefreshTokenReq,
  RefreshTokenRes,
} from '~/shared-module/models/refresh-access.model';
import { AbstractHttpClientProvider } from '../abstract-http-client-provider';

@Injectable({ providedIn: 'root' })
export class IdentityHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  tokenLogin$(req: TokenLoginReq): Observable<LoginRes> {
    return this._httpClient.post<LoginRes>(
      `${this._apiUrl}/api/v1/auth/login/token`,
      req
    );
  }

  refreshToken$(req: RefreshTokenReq): Observable<RefreshTokenRes> {
    return this._httpClient.patch<RefreshTokenRes>(
      `${this._apiUrl}/api/v1/auth/token/refresh`,
      req
    );
  }

  logout$(refreshToken: string): Observable<BaseMessage> {
    const headers = new HttpHeaders({
      'X-RefreshToken': refreshToken,
    });
    return this._httpClient.delete<BaseMessage>(
      `${this._apiUrl}/api/v1/auth/logout`,
      { headers }
    );
  }
}
