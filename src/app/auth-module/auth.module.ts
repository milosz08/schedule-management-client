/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { matArrowRightAlt } from '@ng-icons/material-icons/baseline';
import { SharedModule } from '~/shared-module/shared.module';
import { AuthPageComponent } from './auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { FirstChangePasswordFormComponent } from './components/first-change-password-form/first-change-password-form.component';
import { LastLoginsComponent } from './components/last-logins/last-logins.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FirstChangePasswordGuard } from './guards/first-change-password/first-change-password.guard';
import { FirstChangePasswordPageComponent } from './pages/first-change-password-page/first-change-password-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { SendTokenViaEmailPageComponent } from './pages/send-token-via-email-page/send-token-via-email-page.component';
import { UserHoverInfoPipe } from './pipes/user-hover-info/user-hover-info.pipe';
import { SavedAccountsService } from './services/saved-accounts/saved-accounts.service';

@NgModule({
  declarations: [
    AuthPageComponent,
    AuthFooterComponent,
    FirstChangePasswordFormComponent,
    FirstChangePasswordPageComponent,
    LastLoginsComponent,
    LoginFormComponent,
    LoginPageComponent,
    ResetPasswordPageComponent,
    SendTokenViaEmailPageComponent,
    UserHoverInfoPipe,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    NgIconsModule.withIcons({ matArrowRightAlt }),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [FirstChangePasswordGuard, SavedAccountsService],
  exports: [],
})
export class AuthModule {}
