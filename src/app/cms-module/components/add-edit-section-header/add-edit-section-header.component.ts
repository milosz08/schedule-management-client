/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ContentMode } from '~/cms-admin-module/types/content-mode.type';

@Component({
  selector: 'app-add-edit-section-header',
  templateUrl: './add-edit-section-header.component.html',
})
export class AddEditSectionHeaderComponent {
  @Input() header = '';
  @Input() returnUrl = '';
  @Input() returnText = '';
  @Input() currentMode: ContentMode = 'add';

  @ContentChild('warning', { static: false })
  warningContent?: TemplateRef<unknown>;

  @ContentChild('info', { static: false })
  infoContent?: TemplateRef<unknown>;
}
