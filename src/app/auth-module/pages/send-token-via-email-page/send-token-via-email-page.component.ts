/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component } from '@angular/core';
import { ResetPasswordService } from '~/auth-module/services/reset-password/reset-password.service';

@Component({
  selector: 'app-send-token-via-email-page',
  templateUrl: './send-token-via-email-page.component.html',
  styleUrl: './send-token-via-email-page.component.scss',
  providers: [ResetPasswordService],
})
export class SendTokenViaEmailPageComponent {
  currentStage$ = this._resetPasswordService.currentStage$;

  constructor(private readonly _resetPasswordService: ResetPasswordService) {}
}
