import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { CurrentLoggedUser } from '~/shared-module/models/identity.model';
import { IdentityService } from '~/shared-module/service/identity/identity.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  currentLoggedUser?: CurrentLoggedUser;

  isLoggingOut$ = this._identityService.isLoggingOut$;

  constructor(
    private readonly _identityService: IdentityService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(this._identityService.currentLoggedUser$).subscribe(
      currentLoggedUser => (this.currentLoggedUser = currentLoggedUser)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleLogout(): void {
    this.wrapAsObservable$(this._identityService.logout$()).subscribe({
      next: async () => await this._router.navigateByUrl('/'),
    });
  }
}
