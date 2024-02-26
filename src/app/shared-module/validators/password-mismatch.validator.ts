/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMismatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('newPassword');
  const repeatPassword = control.get('newPasswordConfirmed');
  return password && repeatPassword && password.value !== repeatPassword.value
    ? {
        passwordMismatch: true,
      }
    : null;
};
