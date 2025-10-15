import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { activateFirstChangePasswordGuard } from './first-change-password.guard';

describe('firstChangePasswordGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      activateFirstChangePasswordGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
