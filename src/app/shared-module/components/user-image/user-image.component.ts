import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CurrentLoggedUser } from '~/shared-module/models/identity.model';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { AbstractReactiveProvider } from '../abstract-reactive-provider';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrl: './user-image.component.scss',
})
export class UserImageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() isLetterShowing = true;
  @Input() isDarkBackgroundTheme = false;

  loggedUser: CurrentLoggedUser | undefined = undefined;

  constructor(private readonly _identityService: IdentityService) {
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
}
