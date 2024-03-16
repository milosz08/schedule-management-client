/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Pipe, PipeTransform } from '@angular/core';
import { ContentMode } from '~/cms-admin-module/types/content-mode.type';

@Pipe({ name: 'isEditMode' })
export class IsEditModePipe implements PipeTransform {
  transform(mode: ContentMode): boolean {
    return mode === 'edit';
  }
}
