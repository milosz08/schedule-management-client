import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordService } from '~/auth-module/services/change-password/change-password.service';
import { ResetPasswordMemoryService } from '~/auth-module/services/reset-password-memory/reset-password-memory.service';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrl: './change-password-page.component.scss',
  providers: [ChangePasswordService],
})
export class ChangePasswordPageComponent {
  currentStage$ = this._changePasswordService.currentStage$;
  resetingPasswordAccount$ =
    this._resetPasswordMemoryService.resetingPasswordAccount$;

  constructor(
    private readonly _changePasswordService: ChangePasswordService,
    private readonly _resetPasswordMemoryService: ResetPasswordMemoryService,
    private readonly _router: Router
  ) {}

  async handleResetAndNavigate(redirectUrl: string): Promise<void> {
    await this._router.navigateByUrl(redirectUrl);
    this._resetPasswordMemoryService.setResetingPasswordAccount(undefined);
  }
}
