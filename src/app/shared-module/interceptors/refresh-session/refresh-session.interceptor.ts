/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { environment } from 'src/environment/environment';
import { RefreshTokenReq } from '~/shared-module/models/refresh-access.model';
import { IdentityHttpClientService } from '~/shared-module/service/identity-http-client/identity-http-client.service';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { LocalStorageService } from '~/shared-module/service/local-storage/local-storage.service';
import { LoggedUser } from '~/shared-module/types/logged-user.type';

@Injectable()
export class RefreshSessionInterceptor implements HttpInterceptor {
  private _isRefreshing = false;
  private _refreshTokenSubject$ = new BehaviorSubject<string | null>(null);

  public static readonly TOKEN_PREFIX = 'Bearer';
  public static readonly TOKEN_HEADER_KEY = 'Authorization';

  constructor(
    private readonly _identityHttpClientService: IdentityHttpClientService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _identityService: IdentityService,
    private readonly _router: Router
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiGateway = environment.apiUrl;
    if (!apiGateway || !req.url.includes(`${apiGateway}/api`)) {
      return next.handle(req);
    }
    let authReq = req;
    const tokenData = this._localStorageService.get<LoggedUser>('logged_user');
    if (tokenData) {
      authReq = this.addTokenHeader(req, tokenData.accessToken);
    }
    return next.handle(authReq).pipe(
      catchError(err => {
        if (
          err instanceof HttpErrorResponse &&
          err.status === 401 &&
          (!err.url?.includes('login') || err.url?.includes('login/token'))
        ) {
          return this.handle401Error(authReq, next, tokenData);
        }
        return throwError(() => err);
      })
    );
  }

  private handle401Error(
    req: HttpRequest<unknown>,
    next: HttpHandler,
    tokenData: LoggedUser | null
  ) {
    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this._refreshTokenSubject$.next(null);
    }
    if (tokenData && tokenData.refreshToken) {
      const { accessToken, refreshToken } = tokenData;
      const reqDto: RefreshTokenReq = {
        expiredAccessToken: accessToken,
        refreshToken,
      };
      return this._identityHttpClientService.refreshToken$(reqDto).pipe(
        switchMap(({ accessToken, refreshToken }) => {
          this._isRefreshing = false;
          this._localStorageService.save<LoggedUser>('logged_user', {
            accessToken,
            refreshToken,
          });
          this._refreshTokenSubject$.next(accessToken);
          return next.handle(this.addTokenHeader(req, accessToken));
        }),
        catchError(err => {
          this._isRefreshing = false;
          this._identityService.logout$();
          this._localStorageService.remove('logged_user');
          this._router.navigateByUrl('/auth/login').then(r => r);
          return throwError(() => err);
        })
      );
    }
    return this._refreshTokenSubject$.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addTokenHeader(req, token!)))
    );
  }

  private addTokenHeader(
    req: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    return req.clone({
      headers: req.headers.set(
        RefreshSessionInterceptor.TOKEN_HEADER_KEY,
        `${RefreshSessionInterceptor.TOKEN_PREFIX} ${token}`
      ),
    });
  }
}

export const refreshSessionInterceptorInitializer = {
  provide: HTTP_INTERCEPTORS,
  useClass: RefreshSessionInterceptor,
  multi: true,
};
