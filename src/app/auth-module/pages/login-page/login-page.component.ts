import { Component } from '@angular/core';
import { LoginService } from '~/auth-module/services/login/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  providers: [LoginService],
})
export class LoginPageComponent {}
