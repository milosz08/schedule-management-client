/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirstChangePasswordReq } from '~/auth-module/models/first-change-password.model';
import { LoginReq } from '~/auth-module/models/login.model';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { LoginRes } from '~/shared-module/models/identity.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable({ providedIn: 'root' })
export class AuthHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  login$(req: LoginReq): Observable<LoginRes> {
    return this._httpClient.post<LoginRes>(
      `${this._apiUrl}/api/v1/auth/login`,
      req
    );
  }

  changeFirstPassword$(req: FirstChangePasswordReq): Observable<BaseMessage> {
    return this._httpClient.patch<BaseMessage>(
      `${this._apiUrl}/api/v1/resetpassword/account/change`,
      req
    );
  }
}
