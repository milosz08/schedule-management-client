/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component } from '@angular/core';
import { fadeInOutAnimation } from '~/shared-module/animations/fade-in-out.animation';
import { IdentityService } from '~/shared-module/service/identity/identity.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  animations: [fadeInOutAnimation],
})
export class LogoutModalComponent {
  isModalVisible$ = this._identityService.isLogout$;

  constructor(private readonly _identityService: IdentityService) {}

  async handleCloseModal(): Promise<void> {
    await this._identityService.closeLogoutModal(false);
  }

  async handleCloseModalAndRedirect(): Promise<void> {
    await this._identityService.closeLogoutModal(true);
  }
}
