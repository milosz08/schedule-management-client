/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  tap,
  throwError,
} from 'rxjs';
import { ResetPasswordReq } from '~/auth-module/models/reset-password.model';
import { SetPasswordFormStage } from '~/auth-module/types/form-stage.type';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { AbstractLoadingProvider } from '~/shared-module/service/abstract-loading-provider';
import { SnackbarService } from '~/shared-module/service/snackbar/snackbar.service';
import { AuthHttpClientService } from '../auth-http-client/auth-http-client.service';
import { ResetPasswordMemoryService } from '../reset-password-memory/reset-password-memory.service';

@Injectable()
export class ChangePasswordService extends AbstractLoadingProvider {
  private _currentStage$ = new BehaviorSubject<SetPasswordFormStage>(
    'change_password'
  );

  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _resetPasswordMemoryService: ResetPasswordMemoryService,
    private readonly _snackbarService: SnackbarService
  ) {
    super();
  }

  changePassword$(req: ResetPasswordReq): Observable<BaseMessage> {
    this.setLoading(true);
    const account = this._resetPasswordMemoryService.resetingPasswordAccount;
    return this._authHttpClientService
      .changePassword$(account?.token || '', req)
      .pipe(
        delay(500),
        tap(({ message }) => {
          this.setLoading(false);
          this._snackbarService.addSnackbar({ message, severity: 'info' });
          this._currentStage$.next('success_change_password');
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  get currentStage$(): Observable<SetPasswordFormStage> {
    return this._currentStage$.asObservable();
  }
}
