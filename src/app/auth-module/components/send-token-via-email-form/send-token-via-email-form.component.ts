import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from '~/auth-module/services/reset-password/reset-password.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-send-token-via-email-form',
  templateUrl: './send-token-via-email-form.component.html',
  styleUrl: './send-token-via-email-form.component.scss',
})
export class SendTokenViaEmailFormComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  loginOrEmailForm: FormGroup;

  loadingFor$ = this._resetPasswordService.loadingFor$;

  constructor(private readonly _resetPasswordService: ResetPasswordService) {
    super();
    this.loginOrEmailForm = new FormGroup({
      loginOrEmail: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitSendToken(): void {
    const { loginOrEmail } = this.loginOrEmailForm.getRawValue();
    this.wrapAsObservable$(
      this._resetPasswordService.sendTokenForResetPassword$(loginOrEmail)
    ).subscribe({ next: () => this.loginOrEmailForm.reset() });
  }

  handleSwitchViewToToken(): void {
    this._resetPasswordService.switchToView('validate_token');
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.loginOrEmailForm, controlName);
  }
}
