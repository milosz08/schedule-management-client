import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { LocalStorageService } from '~/shared-module/service/local-storage/local-storage.service';
import { OmitChangeFirstPassword } from '~/shared-module/types/omit-change-first-password.type';

@Injectable()
export class FirstChangePasswordGuard {
  canActivate(
    identityService: IdentityService,
    localStorageService: LocalStorageService,
    router: Router
  ): Observable<boolean> {
    return identityService.currentLoggedUser$.pipe(
      map(loggedUser => {
        const isOmitData = localStorageService.get<OmitChangeFirstPassword>(
          'omit_change_first_password'
        );
        if (
          loggedUser?.firstAccess &&
          (!isOmitData || !isOmitData[loggedUser?.login])
        ) {
          return true;
        }
        router.navigateByUrl('/').then(r => r);
        return false;
      })
    );
  }
}

export const activateFirstChangePasswordGuard: CanActivateFn = () => {
  return inject(FirstChangePasswordGuard).canActivate(
    inject(IdentityService),
    inject(LocalStorageService),
    inject(Router)
  );
};
