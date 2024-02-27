/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from '~/auth-module/services/change-password/change-password.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { passwordMismatchValidator } from '~/shared-module/validators/password-mismatch.validator';
import { PASSWORD_REGEX } from '~/shared-module/validators/regex.validator';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss',
})
export class ChangePasswordFormComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  changePasswordForm: FormGroup;

  isLoading$ = this._changePasswordService.isLoading$;

  constructor(private readonly _changePasswordService: ChangePasswordService) {
    super();
    this.changePasswordForm = new FormGroup(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(PASSWORD_REGEX),
        ]),
        newPasswordConfirmed: new FormControl('', [
          Validators.required,
          Validators.pattern(PASSWORD_REGEX),
        ]),
      },
      {
        validators: passwordMismatchValidator,
      }
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitNewPassword(): void {
    this.wrapAsObservable$(
      this._changePasswordService.changePassword$(
        this.changePasswordForm.getRawValue()
      )
    ).subscribe();
  }

  passwordFieldHasErrors(): boolean {
    const field = this.changePasswordForm.get('newPassword');
    return !!field?.touched && !!field?.errors;
  }
}
