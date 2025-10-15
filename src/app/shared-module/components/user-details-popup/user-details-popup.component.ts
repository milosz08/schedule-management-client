import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentLoggedUser } from '~/shared-module/models/identity.model';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { SessionService } from '~/shared-module/service/session/session.service';
import { AbstractReactiveProvider } from '../abstract-reactive-provider';

@Component({
  selector: 'app-user-details-popup',
  templateUrl: './user-details-popup.component.html',
  styleUrl: './user-details-popup.component.scss',
})
export class UserDetailsPopupComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() isCmsPanel = false;

  loggedUser: CurrentLoggedUser | undefined = undefined;

  sessionCurrentTime$ = this._sessionService.sessionCurrentTime$;
  sesionSoonEnded$ = this._sessionService.sessionSoonEnded$;
  isLoggingOut$ = this._identityService.isLoggingOut$;

  constructor(
    private readonly _identityService: IdentityService,
    private readonly _sessionService: SessionService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(this._identityService.currentLoggedUser$).subscribe(
      loggedUser => (this.loggedUser = loggedUser)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleUserLogout(): void {
    this.wrapAsObservable$(this._identityService.logout$()).subscribe({
      next: async () => {
        if (this.isCmsPanel) {
          await this._router.navigateByUrl('/');
        }
      },
    });
  }
}
