import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  template: `
    <main class="app__auth-container">
      <router-outlet />
    </main>
    <app-auth-footer />
  `,
})
export class AuthPageComponent {}
