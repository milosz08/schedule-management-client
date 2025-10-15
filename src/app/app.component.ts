import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractReactiveProvider } from './shared-module/components/abstract-reactive-provider';
import { IdentityService } from './shared-module/service/identity/identity.service';
import { SessionService } from './shared-module/service/session/session.service';

@Component({
  selector: 'app-root',
  template: `
    <app-loading-suspense-card />
    <app-snackbars-container />
    <app-end-session-modal />
    <app-logout-modal />
    <router-outlet />
  `,
})
export class AppComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  isUserLogged = false;

  constructor(
    private readonly _sessionService: SessionService,
    private readonly _identityService: IdentityService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(this._identityService.currentLoggedUser$).subscribe(
      loggedUser => (this.isUserLogged = !!loggedUser)
    );
    this.wrapAsObservable$(this._identityService.autoLogin$()).subscribe({
      next: async redirectUrl => {
        if (redirectUrl) {
          await this._router.navigateByUrl(redirectUrl);
        }
      },
      error: async () => await this._router.navigateByUrl('auth/login'),
    });
    this.wrapAsObservable$(
      this._identityService.onEndSessionAction$()
    ).subscribe({
      next: async redirectUrl => await this._router.navigateByUrl(redirectUrl),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.isUserLogged) {
      this._sessionService.renewSession();
    }
  }
}
