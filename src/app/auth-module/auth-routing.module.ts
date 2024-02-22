/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { SendTokenViaEmailPageComponent } from './pages/send-token-via-email-page/send-token-via-email-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        title: 'Logowanie',
      },
      {
        path: 'require-reset-password',
        component: SendTokenViaEmailPageComponent,
        title: 'Resetuj hasło',
      },
      {
        path: 'reset-password',
        component: ResetPasswordPageComponent,
        title: 'Zmień hasło',
      },
      {
        path: 'first-change-password',
        component: ResetPasswordPageComponent,
        title: 'Pierwsza zmiana hasła',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
