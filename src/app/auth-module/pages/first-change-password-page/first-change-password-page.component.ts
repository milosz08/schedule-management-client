import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirstChangePasswordService } from '~/auth-module/services/first-change-password/first-change-password.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { CurrentLoggedUser } from '~/shared-module/models/identity.model';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { LocalStorageService } from '~/shared-module/service/local-storage/local-storage.service';

@Component({
  selector: 'app-first-change-password-page',
  templateUrl: './first-change-password-page.component.html',
  styleUrl: './first-change-password-page.component.scss',
  providers: [FirstChangePasswordService],
})
export class FirstChangePasswordPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  loggedUser?: CurrentLoggedUser;

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _identityService: IdentityService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(this._identityService.currentLoggedUser$).subscribe(
      loggedUser => {
        this.loggedUser = loggedUser;
      }
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleDisableShowThisPageAgain(pageVisibility: boolean): void {
    if (this.loggedUser) {
      this._localStorageService.save('omit_change_first_password', {
        [this.loggedUser?.login]: pageVisibility,
      });
    }
  }
}
