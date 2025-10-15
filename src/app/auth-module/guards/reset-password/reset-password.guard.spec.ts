import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { activateResetPasswordGuard } from './reset-password.guard';

describe('resetPasswordGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      activateResetPasswordGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
