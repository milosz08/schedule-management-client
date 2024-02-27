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
  map,
  throwError,
} from 'rxjs';
import { ResetPasswordFormStage } from '~/auth-module/types/form-stage.type';
import { ResetPasswordLoader } from '~/auth-module/types/loading-for.type';
import { SnackbarService } from '~/shared-module/service/snackbar/snackbar.service';
import { AuthHttpClientService } from '../auth-http-client/auth-http-client.service';
import { ResetPasswordMemoryService } from '../reset-password-memory/reset-password-memory.service';

@Injectable()
export class ResetPasswordService {
  private _loadingFor$ = new BehaviorSubject<ResetPasswordLoader>('none');
  private _currentStage$ = new BehaviorSubject<ResetPasswordFormStage>(
    'send_token'
  );

  constructor(
    private readonly _snackbarService: SnackbarService,
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _resetPasswordMemoryService: ResetPasswordMemoryService
  ) {}

  sendTokenForResetPassword$(loginOrEmail: string): Observable<null> {
    this._loadingFor$.next('send_token');
    return this._authHttpClientService
      .sendTokenForResetPassword$(loginOrEmail)
      .pipe(
        delay(500),
        map(({ message }) => {
          this._loadingFor$.next('none');
          this._snackbarService.addSnackbar({ message, severity: 'info' });
          this._currentStage$.next('validate_token');
          return null;
        }),
        catchError(err => {
          this._loadingFor$.next('none');
          return throwError(() => err);
        })
      );
  }

  validateToken$(token: string): Observable<string> {
    this._loadingFor$.next('validate_token');
    return this._authHttpClientService.checkResetPasswordToken$(token).pipe(
      delay(500),
      map(res => {
        this._loadingFor$.next('none');
        this._resetPasswordMemoryService.setResetingPasswordAccount(res);
        return `/auth/change-password`;
      }),
      catchError(err => {
        this._loadingFor$.next('none');
        return throwError(() => err);
      })
    );
  }

  switchToView(stage: ResetPasswordFormStage): void {
    this._currentStage$.next(stage);
  }

  get currentStage$(): Observable<ResetPasswordFormStage> {
    return this._currentStage$.asObservable();
  }
  get loadingFor$(): Observable<ResetPasswordLoader> {
    return this._loadingFor$.asObservable();
  }
}
