import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { activateActiveNonLoggedUserGuard } from './active-non-logged-user.guard';

describe('activeNonLoggedUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      activateActiveNonLoggedUserGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
