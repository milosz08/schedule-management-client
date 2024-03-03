/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-cms-page',
  template: `
    <app-header />
    <div class="app__cms-container">
      <app-left-navigation class="app__cms-navigation-container" />
      <main class="app__cms-main-container">
        <router-outlet class="app__cms-outlet-container" />
      </main>
    </div>
    <app-footer />
  `,
})
export class CmsPageComponent {}
