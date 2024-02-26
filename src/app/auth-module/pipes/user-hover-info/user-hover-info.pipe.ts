/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Pipe, PipeTransform } from '@angular/core';
import { SavedAccountRes } from '~/shared-module/models/memory-storage.model';

@Pipe({ name: 'userHoverInfo' })
export class UserHoverInfoPipe implements PipeTransform {
  transform(user: SavedAccountRes): string {
    return `Użytkownik: ${user.nameWithSurname}\nAdres email: ${user.email}\nRola w systemie: ${user.role}`;
  }
}
