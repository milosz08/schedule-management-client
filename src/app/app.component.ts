/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-loading-suspense-card />
    <router-outlet />
  `,
})
export class AppComponent {}
