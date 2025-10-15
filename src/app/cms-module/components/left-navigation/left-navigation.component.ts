import { Component, HostListener } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DomService } from '~/cms-module/services/dom/dom.service';
import { fadeInOutAnimation } from '~/shared-module/animations/fade-in-out.animation';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { UserIdentityType } from '~/shared-module/types/user-identity.type';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrl: './left-navigation.component.scss',
  animations: [fadeInOutAnimation],
})
export class LeftNavigationComponent {
  isAutoCloseActive = window.innerWidth <= 839;

  menuVisibility$ = this._domService.menuVisibility$;
  loggedUserRole$ = this._identityService.loggedUserRole$;

  constructor(
    private readonly _domService: DomService,
    private readonly _identityService: IdentityService
  ) {}

  @HostListener('window:resize')
  onResize() {
    this.isAutoCloseActive = window.innerWidth <= 839;
  }

  handleCloseMenu(): void {
    if (this.isAutoCloseActive) {
      this._domService.changeMenuVisibility(false);
    }
  }

  hasRole(...roles: (keyof typeof UserIdentityType)[]): Observable<boolean> {
    return this.loggedUserRole$.pipe(
      map(
        role => !!role && roles.map(key => UserIdentityType[key]).includes(role)
      )
    );
  }
}
