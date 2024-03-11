/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fromDashToCamel' })
export class FromDashToCamelPipe implements PipeTransform {
  transform(dashCase: string): string {
    return dashCase.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  }
}
