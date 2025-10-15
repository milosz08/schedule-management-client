import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from '~/auth-module/services/reset-password/reset-password.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-insert-token-form',
  templateUrl: './insert-token-form.component.html',
  styleUrl: './insert-token-form.component.scss',
})
export class InsertTokenFormComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  tokenForm: FormGroup;

  loadingFor$ = this._resetPasswordService.loadingFor$;

  constructor(
    private readonly _resetPasswordService: ResetPasswordService,
    private readonly _router: Router
  ) {
    super();
    this.tokenForm = new FormGroup({
      token: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitSendToken(): void {
    const { token } = this.tokenForm.getRawValue();
    this.wrapAsObservable$(
      this._resetPasswordService.validateToken$(token)
    ).subscribe({
      next: async redirectUrl => {
        this.tokenForm.reset();
        await this._router.navigateByUrl(redirectUrl);
      },
    });
  }

  handleSwitchViewToEmail(): void {
    this._resetPasswordService.switchToView('send_token');
  }

  checkIsTokenFieldHasErrors(): boolean {
    return (
      this.checkFormFieldErrors(this.tokenForm, 'token') &&
      this.tokenForm.get('token')!.errors?.['minlength']
    );
  }
}
