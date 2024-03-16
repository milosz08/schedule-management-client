/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  filter,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import {
  CurrentLoggedUser,
  LoginRes,
} from '~/shared-module/models/identity.model';
import { LoggedUser } from '~/shared-module/types/logged-user.type';
import { OmitChangeFirstPassword } from '~/shared-module/types/omit-change-first-password.type';
import { UserIdentityType } from '~/shared-module/types/user-identity.type';
import { IdentityHttpClientService } from '../identity-http-client/identity-http-client.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { SessionService } from '../session/session.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { SuspenseLoaderService } from '../suspense-loader/suspense-loader.service';

@Injectable({ providedIn: 'root' })
export class IdentityService {
  private _isLogout$ = new BehaviorSubject<boolean>(false);
  private _isLoggingOut$ = new BehaviorSubject<boolean>(false);

  private _currentLoggedUser$ = new BehaviorSubject<
    CurrentLoggedUser | undefined
  >(undefined);

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _suspenseLoaderService: SuspenseLoaderService,
    private readonly _router: Router,
    private readonly _identityHttpClientService: IdentityHttpClientService,
    private readonly _sanitizer: DomSanitizer,
    private readonly _snackbarService: SnackbarService,
    private readonly _sessionService: SessionService
  ) {}

  onEndSessionAction$(): Observable<string> {
    return this._sessionService.currentWaitingTime$.pipe(
      filter(waitingTime => waitingTime === 1),
      switchMap(() => this.logout$()),
      map(() => {
        this._sessionService.unlockListener();
        return '/';
      })
    );
  }

  setCurrentLoggedUser(loggedUser: LoginRes, fromAutoLogin?: boolean): string {
    this._currentLoggedUser$.next({
      ...loggedUser,
      initials: this.createUserInitials(loggedUser),
      profileImageUrl: loggedUser.profileImageUrl
        ? this._sanitizer.bypassSecurityTrustUrl(loggedUser.profileImageUrl)
        : null,
    });
    this._localStorageService.save('logged_user', {
      accessToken: loggedUser.bearerToken,
      refreshToken: loggedUser.refreshBearerToken,
    });
    let redirectUrl = '/';
    if (loggedUser.firstAccess) {
      const omitData = this._localStorageService.get<OmitChangeFirstPassword>(
        'omit_change_first_password'
      );
      if (!omitData || !omitData[loggedUser.login]) {
        redirectUrl = '/auth/first-change-password';
      }
    }
    this._sessionService.startSession();
    if (fromAutoLogin) {
      return '';
    }
    return redirectUrl;
  }

  updateProfileImage(imageUrl: string): void {
    const currentData = this._currentLoggedUser$.value;
    if (currentData) {
      currentData.profileImageUrl = imageUrl;
      this._currentLoggedUser$.next(currentData);
    }
  }

  autoLogin$(): Observable<string> {
    const loggedUser = this._localStorageService.get<LoggedUser>('logged_user');
    if (!loggedUser) {
      this._suspenseLoaderService.startGlobalLoader();
      return of('');
    }
    return this._identityHttpClientService.tokenLogin$(loggedUser).pipe(
      map(res => {
        this._suspenseLoaderService.stopGlobalLoader();
        return this.setCurrentLoggedUser(res, true);
      })
    );
  }

  logout$(): Observable<BaseMessage> {
    this._isLoggingOut$.next(true);
    const loggedUser = this._localStorageService.get<LoggedUser>('logged_user');
    return this._identityHttpClientService
      .logout$(loggedUser?.refreshToken || '')
      .pipe(
        delay(1000),
        tap(({ message }) => {
          this._isLoggingOut$.next(false);
          this._currentLoggedUser$.next(undefined);
          this._isLogout$.next(true);
          this._localStorageService.remove('logged_user');
          this._snackbarService.addSnackbar({ message, severity: 'info' });
          this._sessionService.stopSession();
        }),
        catchError(err => {
          this._isLoggingOut$.next(false);
          return throwError(() => err);
        })
      );
  }

  async closeLogoutModal(isRedirect: boolean): Promise<void> {
    this._isLogout$.next(false);
    if (isRedirect) {
      await this._router.navigateByUrl('/auth/login');
    }
  }

  private createUserInitials(res: LoginRes): string {
    const [name, surname] = res.nameWithSurname.split(' ');
    return name.charAt(0) + surname.charAt(0);
  }

  get currentLoggedUser$(): Observable<CurrentLoggedUser | undefined> {
    return this._currentLoggedUser$.asObservable();
  }
  get isLogout$(): Observable<boolean> {
    return this._isLogout$.asObservable();
  }
  get isLoggingOut$(): Observable<boolean> {
    return this._isLoggingOut$.asObservable();
  }
  get loggedUserRole$(): Observable<UserIdentityType | undefined> {
    return this._currentLoggedUser$.pipe(map(loggedUser => loggedUser?.role));
  }
  get loggedUserLogin$(): Observable<string> {
    return this._currentLoggedUser$.pipe(
      map(loggedUser => loggedUser?.login || '')
    );
  }
  get loggedUserDepartment$(): Observable<string> {
    return this._currentLoggedUser$.pipe(
      map(loggedUser => loggedUser?.connectedWithDepartment || '')
    );
  }
}
