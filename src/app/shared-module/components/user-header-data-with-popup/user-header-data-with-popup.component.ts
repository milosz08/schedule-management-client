import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOutAnimation } from '~/shared-module/animations/fade-in-out.animation';
import { CurrentLoggedUser } from '~/shared-module/models/identity.model';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { SessionService } from '~/shared-module/service/session/session.service';
import { AbstractReactiveProvider } from '../abstract-reactive-provider';

@Component({
  selector: 'app-user-header-data-with-popup',
  templateUrl: './user-header-data-with-popup.component.html',
  styleUrl: './user-header-data-with-popup.component.scss',
  animations: [fadeInOutAnimation],
})
export class UserHeaderDataWithPopupComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() blockedOpenPopup = true;
  @Input() isDarkBackgroundTheme = false;
  @Input() isCmsPanel = false;

  isModalOpen = false;
  loggedUser: CurrentLoggedUser | undefined = undefined;

  sessionCurrentTime$ = this._sessionService.sessionCurrentTime$;
  sesionSoonEnded$ = this._sessionService.sessionSoonEnded$;

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

  async handleOpenUserDetailsPopup(): Promise<void> {
    if (!this.loggedUser) {
      await this._router.navigate(['auth/login']);
    } else {
      this.isModalOpen = !this.isModalOpen;
    }
  }
}
