/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { AddEditContentService } from '../services/add-edit-content/add-edit-content.service';
import { ContentMode } from '../types/content-mode.type';

export class AbstractAddEditContentProvider extends AbstractReactiveProvider {
  currentMode: ContentMode = 'add';

  constructor(addEditContentService: AddEditContentService) {
    super();
    this.currentMode = addEditContentService.getCurrentMode();
  }
}
