/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirstChangePasswordReq } from '~/auth-module/models/first-change-password.model';
import { FirstChangePasswordService } from '~/auth-module/services/first-change-password/first-change-password.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { passwordMismatchValidator } from '~/shared-module/validators/password-mismatch.validator';
import { PASSWORD_REGEX } from '~/shared-module/validators/regex.validator';

@Component({
  selector: 'app-first-change-password-form',
  templateUrl: './first-change-password-form.component.html',
  styleUrl: './first-change-password-form.component.scss',
})
export class FirstChangePasswordFormComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  newPasswordForm: FormGroup;

  isLoading$ = this._firstChangePasswordService.isLoading$;

  constructor(
    private readonly _firstChangePasswordService: FirstChangePasswordService,
    private readonly _router: Router
  ) {
    super();
    this.newPasswordForm = new FormGroup(
      {
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(PASSWORD_REGEX),
        ]),
        newPasswordConfirmed: new FormControl('', [Validators.required]),
      },
      {
        validators: passwordMismatchValidator,
      }
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitChangePassword(): void {
    this.wrapAsObservable$(
      this._firstChangePasswordService.changeFirstPassword$(
        this.newPasswordForm.getRawValue() as FirstChangePasswordReq
      )
    ).subscribe({
      next: async redirectUrl => {
        this.newPasswordForm.reset();
        await this._router.navigateByUrl(redirectUrl);
      },
    });
  }

  isPasswordFieldHasErrors(): boolean {
    const newPassword = this.newPasswordForm.get('newPassword')!;
    return newPassword.touched && newPassword.errors?.['notMath'];
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.newPasswordForm, controlName);
  }
}
