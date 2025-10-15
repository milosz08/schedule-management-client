import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, throwError } from 'rxjs';
import { LoginReq } from '~/auth-module/models/login.model';
import { AbstractLoadingProvider } from '~/shared-module/service/abstract-loading-provider';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { AuthHttpClientService } from '../auth-http-client/auth-http-client.service';
import { SavedAccountsService } from '../saved-accounts/saved-accounts.service';

@Injectable()
export class LoginService extends AbstractLoadingProvider {
  constructor(
    private readonly _identityService: IdentityService,
    private readonly _savedAccountsService: SavedAccountsService,
    private readonly _authHttpClientService: AuthHttpClientService
  ) {
    super();
  }

  login$(req: LoginReq, saveAccount: boolean): Observable<string> {
    this.setLoading(true);
    return this._authHttpClientService.login$(req).pipe(
      delay(1000),
      map(res => {
        this.setLoading(false);
        if (saveAccount) {
          this._savedAccountsService.addUserAccount(res);
        }
        return this._identityService.setCurrentLoggedUser(res);
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
