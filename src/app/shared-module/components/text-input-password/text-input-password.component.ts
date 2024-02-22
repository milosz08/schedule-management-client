/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input-password',
  templateUrl: './text-input-password.component.html',
})
export class TextInputPasswordComponent {
  @Input() formControlName = '';
  @Input() inputPlaceholder = '';
  @Input() formGroup?: FormGroup;
  @Input() isLightTheme = true;

  isPasswordVisible = false;

  handleChangePasswordVisibility(): void {
    if (this.formGroup!.get(this.formControlName)?.value !== '') {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
  }
}
