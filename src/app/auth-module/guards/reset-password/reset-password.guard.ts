/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ResetPasswordMemoryService } from '~/auth-module/services/reset-password-memory/reset-password-memory.service';

@Injectable()
export class ResetPasswordGuard {
  canActivate(
    resetPasswordMemoryService: ResetPasswordMemoryService,
    router: Router
  ): Observable<boolean> {
    return resetPasswordMemoryService.resetingPasswordAccount$.pipe(
      map(resetingPasswordAccount => {
        if (resetingPasswordAccount) {
          return true;
        }
        router.navigateByUrl('/auth/reset-password').then(r => r);
        return false;
      })
    );
  }
}

export const activateResetPasswordGuard: CanActivateFn = () => {
  return inject(ResetPasswordGuard).canActivate(
    inject(ResetPasswordMemoryService),
    inject(Router)
  );
};
