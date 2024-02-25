/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy } from '@angular/core';
import { fadeInOutAnimation } from '~/shared-module/animations/fade-in-out.animation';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { SessionService } from '~/shared-module/service/session/session.service';
import { AbstractReactiveProvider } from '../abstract-reactive-provider';

@Component({
  selector: 'app-end-session-modal',
  templateUrl: './end-session-modal.component.html',
  animations: [fadeInOutAnimation],
})
export class EndSessionModalComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  readonly waitingTime = SessionService.MAX_RESPONSE_WAITING_SEC;

  isModalOpen$ = this._sessionService.isSessionEnded$;
  currentWaitingTime$ = this._sessionService.currentWaitingTime$;
  isLoggingOut$ = this._identityService.isLoggingOut$;

  constructor(
    private readonly _sessionService: SessionService,
    private readonly _identityService: IdentityService
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleCloseModalAndLogoutUser(): void {
    this.wrapAsObservable$(this._identityService.logout$()).subscribe({
      next: () => this._sessionService.stopSession(),
    });
  }

  handleCloseModalAndRenewSession(): void {
    this._sessionService.unlockListenerAndRenewSession();
  }
}
