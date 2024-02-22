/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~/shared-module/shared.module';
import { AuthPageComponent } from './auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { FirstChangePasswordPageComponent } from './pages/first-change-password-page/first-change-password-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { SendTokenViaEmailPageComponent } from './pages/send-token-via-email-page/send-token-via-email-page.component';

@NgModule({
  declarations: [
    AuthPageComponent,
    AuthFooterComponent,
    FirstChangePasswordPageComponent,
    LoginPageComponent,
    ResetPasswordPageComponent,
    SendTokenViaEmailPageComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [],
  exports: [],
})
export class AuthModule {}
