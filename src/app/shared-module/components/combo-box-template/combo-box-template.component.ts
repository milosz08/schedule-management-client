/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import {
  Component,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NameWithId } from '~/shared-module/types/drop-lists-data.type';

@Component({
  selector: 'app-combo-box-template',
  templateUrl: './combo-box-template.component.html',
  styleUrl: './combo-box-template.component.scss',
})
export class ComboBoxTemplateComponent implements OnChanges {
  @Input() labelId = '';
  @Input() formGroup?: FormGroup;
  @Input() formControlId = '';
  @Input() placeholder = '';
  @Input() allOptions: NameWithId[] = [];

  isLostFocus = false;
  isListVisible = false;
  toggleCheckAll = false;
  currentElements: (string | number)[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const allOptions = changes['allOptions'];
    if (allOptions) {
      this.toggleCheckAll = (allOptions.currentValue as NameWithId[])
        .map(({ id }) => this.checkedInitial(id))
        .every(option => option);
    }
  }

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
    return this.formGroup?.get(this.formControlId)!.value.length;
  }

  handleToggleCheckAll(): void {
    this.toggleCheckAll = !this.toggleCheckAll;
    this.currentElements = this.toggleCheckAll
      ? this.allOptions.map(({ id }) => id)
      : [];
    this.formGroup!.get(this.formControlId)!.patchValue(this.currentElements);
  }

  handleToggleValuesInArray(status: boolean, value: number | string): void {
    const allElements = this.formGroup!.get(this.formControlId)!.value;
    this.currentElements = status
      ? [...allElements, value]
      : allElements.filter((el: number) => el !== value);
    this.toggleCheckAll =
      this.currentElements.length === this.allOptions.length;
    this.formGroup!.get(this.formControlId)!.patchValue(this.currentElements);
  }

  checkedInitial(dbIdx: number | string): boolean {
    return this.formGroup!.get(this.formControlId)!.value.includes(dbIdx);
  }
}
