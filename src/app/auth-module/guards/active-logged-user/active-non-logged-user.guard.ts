/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { IdentityService } from '~/shared-module/service/identity/identity.service';

@Injectable()
export class ActiveNonLoggedUserGuard {
  canActivate(
    identityService: IdentityService,
    router: Router
  ): Observable<boolean> {
    return identityService.currentLoggedUser$.pipe(
      map(loggedUser => !loggedUser),
      tap(isValid => {
        if (!isValid) {
          router.navigateByUrl('/');
        }
      })
    );
  }
}

export const activateActiveNonLoggedUserGuard: CanActivateFn = () => {
  return inject(ActiveNonLoggedUserGuard).canActivate(
    inject(IdentityService),
    inject(Router)
  );
};
