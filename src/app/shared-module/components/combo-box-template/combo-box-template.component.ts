/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NameWithId } from '~/shared-module/models/drop-lists-data.model';

@Component({
  selector: 'app-combo-box-template',
  templateUrl: './combo-box-template.component.html',
  styleUrl: './combo-box-template.component.scss',
})
export class ComboBoxTemplateComponent {
  @Input() formGroup?: FormGroup;
  @Input() formControlName = '';
  @Input() placeholder = '';
  @Input() allOptions: NameWithId[] = [];

  isLostFocus = false;
  isListVisible = false;

  @HostListener('document:click', ['$event'])
  handlerFunction(): void {
    if (this.isLostFocus) {
      this.isListVisible = false;
    }
  }

  handleOpenList(): void {
    if (!this.isListVisible) {
      this.isLostFocus = false;
      this.isListVisible = true;
    }
  }

  valuesArrayLenght(): number {
    return this.formGroup?.get(this.formControlName)!.value.length;
  }

  handleToggleValuesInArray(status: boolean, value: number | string): void {
    const allElements = this.formGroup!.get(this.formControlName)!.value;
    this.formGroup!.get(this.formControlName)!.patchValue(
      status
        ? [...allElements, value]
        : allElements.filter((el: number) => el !== value)
    );
  }

  checkedInitial(dbIdx: number | string): boolean {
    return this.formGroup!.get(this.formControlName)!.value.includes(dbIdx);
  }
}