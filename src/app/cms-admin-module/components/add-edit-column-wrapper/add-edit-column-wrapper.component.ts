/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-edit-column-wrapper',
  templateUrl: './add-edit-column-wrapper.component.html',
})
export class AddEditColumnWrapperComponent {
  @Input() formHeader = '';
  @Input() resultHeader = '';
}
