import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirstChangePasswordReq } from '~/auth-module/models/first-change-password.model';
import { LoginReq } from '~/auth-module/models/login.model';
import {
  CheckResetPasswordRes,
  ResetPasswordReq,
} from '~/auth-module/models/reset-password.model';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { LoginRes } from '~/shared-module/models/identity.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
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

  sendTokenForResetPassword$(loginOrEmail: string): Observable<BaseMessage> {
    return this._httpClient.post<BaseMessage>(
      `${this._apiUrl}/api/v1/resetpassword/email`,
      null,
      { params: { loginOrEmail } }
    );
  }

  checkResetPasswordToken$(token: string): Observable<CheckResetPasswordRes> {
    return this._httpClient.patch<CheckResetPasswordRes>(
      `${this._apiUrl}/api/v1/resetpassword/email/check/token/${token}`,
      null
    );
  }

  changePassword$(
    token: string,
    req: ResetPasswordReq
  ): Observable<BaseMessage> {
    return this._httpClient.patch<BaseMessage>(
      `${this._apiUrl}/api/v1/resetpassword/email/change/token/${token}`,
      req
    );
  }
}
