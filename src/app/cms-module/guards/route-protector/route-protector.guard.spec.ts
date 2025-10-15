import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import {
  activateAdminRouteProtectorGuard,
  activateBaseRouteProtectorGuard,
  activateEditorRouteProtectorGuard,
  activateStudentAndTeacherRouteProtectorGuard,
} from './route-protector.guard';

describe('activeNonLoggedUserGuard', () => {
  const executeAdminGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      activateAdminRouteProtectorGuard(...guardParameters)
    );

  const executeEditorGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      activateEditorRouteProtectorGuard(...guardParameters)
    );

  const executeStudentAndTeacherGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      activateStudentAndTeacherRouteProtectorGuard(...guardParameters)
    );

  const executeBaseGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      activateBaseRouteProtectorGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be admin created', () => {
    expect(executeAdminGuard).toBeTruthy();
  });

  it('should be editor created', () => {
    expect(executeEditorGuard).toBeTruthy();
  });

  it('should be student and teacher created', () => {
    expect(executeStudentAndTeacherGuard).toBeTruthy();
  });

  it('should be base created', () => {
    expect(executeBaseGuard).toBeTruthy();
  });
});
