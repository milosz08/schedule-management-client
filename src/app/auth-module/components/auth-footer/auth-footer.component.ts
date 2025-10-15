import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-footer',
  templateUrl: './auth-footer.component.html',
  styleUrl: './auth-footer.component.scss',
})
export class AuthFooterComponent {
  currentDate = new Date();
}
