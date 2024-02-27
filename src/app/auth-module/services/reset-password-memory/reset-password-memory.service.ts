/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckResetPasswordRes } from '~/auth-module/models/reset-password.model';

@Injectable({ providedIn: 'root' })
export class ResetPasswordMemoryService {
  private _resetingPasswordAccount$ = new BehaviorSubject<
    CheckResetPasswordRes | undefined
  >(undefined);

  setResetingPasswordAccount(account: CheckResetPasswordRes | undefined): void {
    this._resetingPasswordAccount$.next(account);
  }

  get resetingPasswordAccount(): CheckResetPasswordRes | undefined {
    return this._resetingPasswordAccount$.value;
  }
  get resetingPasswordAccount$(): Observable<
    CheckResetPasswordRes | undefined
  > {
    return this._resetingPasswordAccount$.asObservable();
  }
}
