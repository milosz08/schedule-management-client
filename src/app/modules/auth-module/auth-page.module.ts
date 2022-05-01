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

import { AuthPageComponent } from './auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';

import { LastLoginsComponent } from './components/last-logins/last-logins.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';

import { AuthService } from '../../services/auth.service';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { TemplatesModule } from '../templates-module/templates.module';
import { FirstChangePasswordPageComponent } from './pages/first-change-password-page/first-change-password-page.component';
import { FirstChangePasswordFormComponent } from './components/first-change-password-form/first-change-password-form.component';


@NgModule({
    declarations: [
        AuthPageComponent,
        LoginPageComponent,
        ResetPasswordPageComponent,
        LastLoginsComponent,
        LoginFormComponent,
        AuthFooterComponent,
        FirstChangePasswordPageComponent,
        FirstChangePasswordFormComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        MatIconModule,
        TemplatesModule,
    ],
    providers: [
        AuthService,
        BrowserStorageService,
    ],
    exports: []
})
export class AuthPageModule {}