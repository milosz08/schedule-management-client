/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-checkbox-template',
  templateUrl: './checkbox-template.component.html',
  styleUrl: './checkbox-template.component.scss',
})
export class CheckboxTemplateComponent implements OnInit {
  @Input() checkboxValue = false;
  @Input() dataValue = '';
  @Input() checkboxLabel = '';
  @Input() isCheckboxDisabled = false;
  @Input() isCheckedInitial? = false;
  @Input() isShowLabel = true;
  @Input() isWhiteBackground = false;

  @Output() checkedEmitter = new EventEmitter<boolean>();
  @Output() checkboxEmitter = new EventEmitter<boolean>();

  checkboxId = '';

  ngOnInit(): void {
    const randomKey = uuidv4();
    this.checkboxId = this.checkboxLabel
      ? `${randomKey}__${this.checkboxLabel.replaceAll(' ', '_').toLowerCase()}`
      : randomKey;
  }

  handleCheckboxToggle(): void {
    this.checkedEmitter.emit(this.checkboxValue);
    this.checkboxValue = !this.checkboxValue;
    this.checkboxEmitter.emit(this.checkboxValue);
  }
}
