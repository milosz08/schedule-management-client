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
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { SnackbarService } from '~/shared-module/service/snackbar/snackbar.service';

@Injectable()
export class GlobalExceptionHandlerInterceptor implements HttpInterceptor {
  constructor(private readonly _snackbarService: SnackbarService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestUrl = new URL(req.url);
    if (requestUrl.origin !== environment.apiUrl) {
      return next.handle(req);
    }
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        this._snackbarService.addSnackbar({
          message:
            err.error.Message ||
            'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.',
          severity: 'error',
        });
        return throwError(() => err);
      })
    );
  }
}

export const globalExceptionHandlerInterceptorInitializer = {
  provide: HTTP_INTERCEPTORS,
  useClass: GlobalExceptionHandlerInterceptor,
  multi: true,
};
