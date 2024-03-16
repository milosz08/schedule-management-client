/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, Input } from '@angular/core';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';

@Component({
  selector: 'app-add-edit-column-wrapper',
  templateUrl: './add-edit-column-wrapper.component.html',
  host: { class: 'app-cms__add-new-content-top-container' },
})
export class AddEditColumnWrapperComponent {
  @Input() formHeader = '';
  @Input() resultHeader = '';

  loadingEditableContent$ = this._addEditContentService.loadingEditableContent$;

  constructor(private readonly _addEditContentService: AddEditContentService) {}
}
