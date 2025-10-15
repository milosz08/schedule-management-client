import { Component } from '@angular/core';

@Component({
  selector: 'app-root-page',
  template: `
    <app-main-header />
    <main class="app__root-container">
      <router-outlet />
    </main>
    <app-main-footer />
  `,
})
export class RootPageComponent {}
