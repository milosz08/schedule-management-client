/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { UserIdentityType } from '~/shared-module/types/user-identity.type';

@Injectable()
export class RouteProtectorGuard {
  canActivate(
    identityService: IdentityService,
    router: Router,
    acceptedRoles: UserIdentityType[]
  ): Observable<boolean> {
    return identityService.currentLoggedUser$.pipe(
      map(
        loggedUser =>
          !!loggedUser &&
          (acceptedRoles.length === 0 ||
            acceptedRoles.includes(loggedUser.role))
      ),
      tap(isValid => {
        if (!isValid) {
          router.navigateByUrl('/');
        }
      })
    );
  }
}

export const activateAdminRouteProtectorGuard: CanActivateFn = () => {
  return inject(RouteProtectorGuard).canActivate(
    inject(IdentityService),
    inject(Router),
    [UserIdentityType.ADMINISTRATOR]
  );
};

export const activateEditorRouteProtectorGuard: CanActivateFn = () => {
  return inject(RouteProtectorGuard).canActivate(
    inject(IdentityService),
    inject(Router),
    [UserIdentityType.ADMINISTRATOR, UserIdentityType.EDITOR]
  );
};

export const activateStudentAndTeacherRouteProtectorGuard: CanActivateFn =
  () => {
    return inject(RouteProtectorGuard).canActivate(
      inject(IdentityService),
      inject(Router),
      [UserIdentityType.STUDENT, UserIdentityType.TEACHER]
    );
  };

export const activateBaseRouteProtectorGuard: CanActivateFn = () => {
  return inject(RouteProtectorGuard).canActivate(
    inject(IdentityService),
    inject(Router),
    []
  );
};
