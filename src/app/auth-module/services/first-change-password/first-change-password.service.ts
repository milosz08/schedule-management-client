import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, throwError } from 'rxjs';
import { FirstChangePasswordReq } from '~/auth-module/models/first-change-password.model';
import { AbstractLoadingProvider } from '~/shared-module/service/abstract-loading-provider';
import { SnackbarService } from '~/shared-module/service/snackbar/snackbar.service';
import { AuthHttpClientService } from '../auth-http-client/auth-http-client.service';

@Injectable()
export class FirstChangePasswordService extends AbstractLoadingProvider {
  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _snackbarService: SnackbarService
  ) {
    super();
  }

  changeFirstPassword$(req: FirstChangePasswordReq): Observable<string> {
    this.setLoading(true);
    return this._authHttpClientService.changeFirstPassword$(req).pipe(
      delay(1000),
      map(({ message }) => {
        this.setLoading(false);
        this._snackbarService.addSnackbar({ message, severity: 'info' });
        return '/';
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
