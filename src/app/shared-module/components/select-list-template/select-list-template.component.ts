import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractReactiveProvider } from '../abstract-reactive-provider';

@Component({
  selector: 'app-select-list-template',
  templateUrl: './select-list-template.component.html',
  styleUrl: './select-list-template.component.scss',
})
export class SelectListTemplateComponent extends AbstractReactiveProvider {
  @Input() formGroup?: FormGroup;
  @Input() formControlId = '';
  @Input() placeholder = '';
  @Input() errorField = '';
  @Input() inputId = '';
  @Input() listElements: string[] = [];

  listVisible: boolean = false;

  handleOpenListVisibility(): void {
    this.listVisible = true;
  }

  handleCloseListVisibility(): void {
    setTimeout(() => (this.listVisible = false), 200);
  }

  handleInsertToInputValue(value: string): void {
    this.formGroup?.patchValue({ [this.formControlId]: value });
    this.listVisible = false;
  }

  validateFormField(): boolean {
    if (!this.formGroup) {
      return false;
    }
    return this.checkFormFieldErrors(this.formGroup, this.formControlId);
  }
}
