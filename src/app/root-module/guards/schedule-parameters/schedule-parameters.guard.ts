/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { ScheduleCanvasService } from '~/shared-module/service/schedule-canvas/schedule-canvas.service';

@Injectable()
export class ScheduleParametersGuard {
  async canActivate(
    router: Router,
    next: ActivatedRouteSnapshot
  ): Promise<boolean> {
    const declaredParams = [
      ...Object.values(ScheduleCanvasService.ROUTE_MANAGER_QUERY_MAP).reduce(
        (acc, value) => acc.concat(value.filter(item => !acc.includes(item)))
      ),
      'for',
    ];
    const queryMapKeys = next.queryParamMap.keys;
    if (
      !(
        queryMapKeys.length === 4 &&
        queryMapKeys.every(key => declaredParams.includes(key))
      )
    ) {
      await router.navigateByUrl('/schedule');
      return false;
    }
    return true;
  }
}

export const activateScheduleParametersGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot
) => {
  return inject(ScheduleParametersGuard).canActivate(inject(Router), next);
};
