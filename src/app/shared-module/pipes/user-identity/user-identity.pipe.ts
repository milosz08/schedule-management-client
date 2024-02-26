/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userIdentity' })
export class UserIdentityPipe implements PipeTransform {
  transform(nameAndSurname: string): string {
    const [name, surname] = nameAndSurname.split(' ');
    return name.charAt(0) + surname.charAt(0);
  }
}
