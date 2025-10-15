import { Pipe, PipeTransform } from '@angular/core';
import { ContentMode } from '~/cms-admin-module/types/content-mode.type';

@Pipe({ name: 'isCreationMode' })
export class IsCreationModePipe implements PipeTransform {
  transform(mode: ContentMode): boolean {
    return mode === 'add';
  }
}
