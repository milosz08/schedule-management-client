/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-list-template',
  templateUrl: './select-list-template.component.html',
  styleUrl: './select-list-template.component.scss',
})
export class SelectListTemplateComponent {
  @Input() formGroup?: FormGroup;
  @Input() formControlName = '';
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
    this.formGroup?.patchValue({ [this.formControlName]: value });
    this.listVisible = false;
  }
}