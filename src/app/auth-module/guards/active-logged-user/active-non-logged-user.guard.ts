/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IdentityService } from '~/shared-module/service/identity/identity.service';

@Injectable()
export class ActiveNonLoggedUserGuard {
  canActivate(identityService: IdentityService): Observable<boolean> {
    return identityService.currentLoggedUser$.pipe(
      map(loggedUser => !loggedUser)
    );
  }
}

export const activateActiveNonLoggedUserGuard: CanActivateFn = () => {
  return inject(ActiveNonLoggedUserGuard).canActivate(inject(IdentityService));
};
