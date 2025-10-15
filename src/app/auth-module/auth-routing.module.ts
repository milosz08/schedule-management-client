import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page.component';
import { activateActiveNonLoggedUserGuard } from './guards/active-logged-user/active-non-logged-user.guard';
import { activateFirstChangePasswordGuard } from './guards/first-change-password/first-change-password.guard';
import { activateResetPasswordGuard } from './guards/reset-password/reset-password.guard';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { FirstChangePasswordPageComponent } from './pages/first-change-password-page/first-change-password-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SendTokenViaEmailPageComponent } from './pages/send-token-via-email-page/send-token-via-email-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: '',
        canActivate: [activateActiveNonLoggedUserGuard],
        runGuardsAndResolvers: 'always',
        children: [
          {
            path: 'login',
            component: LoginPageComponent,
            title: 'Logowanie',
          },
          {
            path: 'reset-password',
            component: SendTokenViaEmailPageComponent,
            title: 'Resetuj hasło',
          },
          {
            path: 'change-password',
            component: ChangePasswordPageComponent,
            title: 'Ustaw hasło',
            canActivate: [activateResetPasswordGuard],
          },
        ],
      },
      {
        path: 'first-change-password',
        component: FirstChangePasswordPageComponent,
        title: 'Pierwsza zmiana hasła',
        canActivate: [activateFirstChangePasswordGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
