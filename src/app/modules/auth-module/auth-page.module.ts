/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: auth-page.module.ts
 * Last modified | Ostatnia modyfikacja: 17/04/2022, 21:30
 * Project name | Nazwa Projektu: angular-po-schedule-management-client
 *
 * Klient | Client: <https://github.com/Milosz08/Angular_PO_Schedule_Management_Client>
 * Serwer | Server: <https://github.com/Milosz08/ASP.NET_PO_Schedule_Management_Server>
 *
 * Client for the ASP.NET Core application to manage schedule for sample university. Written with the Angular Framework
 * for generating dynamic web applications. Project for the teaching course "Objected Oriented Programming".
 *
 * Klient dla aplikacji ASP.NET Core służącej do zarządzania planem zajęć uczelni. Napisany przy użyciu frameworka
 * Angular do generowania dynamicznych aplikacji webowych. Projekt wykonany na zajęcia "Programowanie
 * Obiektowe".
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { TemplatesModule } from '../templates-module/templates.module';

import { AuthPageComponent } from './auth-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { SendTokenViaEmailPageComponent } from './pages/send-token-via-email-page/send-token-via-email-page.component';
import { FirstChangePasswordPageComponent } from './pages/first-change-password-page/first-change-password-page.component';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { LastLoginsComponent } from './components/last-logins/last-logins.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { InsertTokenFormComponent } from './components/insert-token-form/insert-token-form.component';
import { SendTokenViaEmailFormComponent } from './components/send-token-via-email-form/send-token-via-email-form.component';
import { FirstChangePasswordFormComponent } from './components/first-change-password-form/first-change-password-form.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { rememberUserReducer } from './ngrx-store/remember-user-ngrx-store/remember-user.reducer';
import { REMEMBER_USER_REDUCER } from './ngrx-store/remember-user-ngrx-store/remember-user.selectors';
import { firstChangePasswordReducer } from './ngrx-store/first-change-password-ngrx-store/first-change-password.reducer';
import { FIRST_CHANGE_PASSWORD_REDUCER } from './ngrx-store/first-change-password-ngrx-store/first-change-password.selectors';
import { resetPasswordReducer } from './ngrx-store/reset-password-ngrx-store/reset-password.reducer';
import { RESET_PASSWORD_REDUCER } from './ngrx-store/reset-password-ngrx-store/reset-password.selectors';

import { SavedUsersEffects } from './ngrx-store/remember-user-ngrx-store/ngrx-effects/saved-users.effects';
import { ResetPasswordEffects } from './ngrx-store/reset-password-ngrx-store/ngrx-effects/reset-password.effects';
import { FirstChangePasswordEffects } from './ngrx-store/first-change-password-ngrx-store/ngrx-effects/first-change-password.effects';

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        // strony
        AuthPageComponent,
        LoginPageComponent,
        ResetPasswordPageComponent,
        SendTokenViaEmailPageComponent,
        FirstChangePasswordPageComponent,
        // widoki
        LoginFormComponent,
        LastLoginsComponent,
        AuthFooterComponent,
        InsertTokenFormComponent,
        SendTokenViaEmailFormComponent,
        FirstChangePasswordFormComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        MatIconModule,
        TemplatesModule,
        // ngrx store
        StoreModule.forFeature(REMEMBER_USER_REDUCER, rememberUserReducer),
        StoreModule.forFeature(RESET_PASSWORD_REDUCER, resetPasswordReducer),
        StoreModule.forFeature(FIRST_CHANGE_PASSWORD_REDUCER, firstChangePasswordReducer),
        // ngrx effects
        EffectsModule.forFeature([
            SavedUsersEffects,
            ResetPasswordEffects,
            FirstChangePasswordEffects,
        ]),
    ],
    providers: [],
    exports: []
})
export class AuthPageModule {}