/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-add-edit-section-header',
  templateUrl: './add-edit-section-header.component.html',
})
export class AddEditSectionHeaderComponent {
  @Input() header = '';
  @Input() returnUrl = '';
  @Input() returnText = '';

  @ContentChild('warning', { static: false })
  warningContent?: TemplateRef<unknown>;

  @ContentChild('info', { static: false })
  infoContent?: TemplateRef<unknown>;
}
