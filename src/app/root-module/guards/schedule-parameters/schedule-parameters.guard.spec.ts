import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { activateScheduleParametersGuard } from './schedule-parameters.guard';

describe('scheduleParametersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      activateScheduleParametersGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
