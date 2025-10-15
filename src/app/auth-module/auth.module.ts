import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import {
  matArrowRightAlt,
  matSubdirectoryArrowLeft,
} from '@ng-icons/material-icons/baseline';
import { SharedModule } from '~/shared-module/shared.module';
import { AuthPageComponent } from './auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { FirstChangePasswordFormComponent } from './components/first-change-password-form/first-change-password-form.component';
import { InsertTokenFormComponent } from './components/insert-token-form/insert-token-form.component';
import { LastLoginsComponent } from './components/last-logins/last-logins.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SendTokenViaEmailFormComponent } from './components/send-token-via-email-form/send-token-via-email-form.component';
import { UserProfileImageComponent } from './components/user-profile-image/user-profile-image.component';
import { ActiveNonLoggedUserGuard } from './guards/active-logged-user/active-non-logged-user.guard';
import { FirstChangePasswordGuard } from './guards/first-change-password/first-change-password.guard';
import { ResetPasswordGuard } from './guards/reset-password/reset-password.guard';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { FirstChangePasswordPageComponent } from './pages/first-change-password-page/first-change-password-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SendTokenViaEmailPageComponent } from './pages/send-token-via-email-page/send-token-via-email-page.component';
import { UserHoverInfoPipe } from './pipes/user-hover-info/user-hover-info.pipe';
import { AuthHttpClientService } from './services/auth-http-client/auth-http-client.service';
import { SavedAccountsService } from './services/saved-accounts/saved-accounts.service';

@NgModule({
  declarations: [
    AuthPageComponent,
    AuthFooterComponent,
    FirstChangePasswordFormComponent,
    FirstChangePasswordPageComponent,
    InsertTokenFormComponent,
    LastLoginsComponent,
    LoginFormComponent,
    LoginPageComponent,
    ChangePasswordPageComponent,
    SendTokenViaEmailFormComponent,
    SendTokenViaEmailPageComponent,
    UserHoverInfoPipe,
    ChangePasswordFormComponent,
    UserProfileImageComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    NgIconsModule.withIcons({ matArrowRightAlt, matSubdirectoryArrowLeft }),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [
    AuthHttpClientService,
    ActiveNonLoggedUserGuard,
    FirstChangePasswordGuard,
    ResetPasswordGuard,
    SavedAccountsService,
  ],
  exports: [],
})
export class AuthModule {}
