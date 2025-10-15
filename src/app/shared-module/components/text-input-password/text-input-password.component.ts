import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input-password',
  templateUrl: './text-input-password.component.html',
})
export class TextInputPasswordComponent {
  @Input() formControlId = '';
  @Input() inputPlaceholder = '';
  @Input() formGroup?: FormGroup;
  @Input() isLightTheme = true;

  isPasswordVisible = false;

  handleChangePasswordVisibility(): void {
    if (this.formGroup!.get(this.formControlId)?.value !== '') {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
  }
}
