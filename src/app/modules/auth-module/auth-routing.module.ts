/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: auth-routing.module.ts
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
import { RouterModule, Routes } from '@angular/router';

import { AuthPageComponent } from './auth-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { SendTokenViaEmailPageComponent } from './pages/send-token-via-email-page/send-token-via-email-page.component';
import { FirstChangePasswordPageComponent } from './pages/first-change-password-page/first-change-password-page.component';

import { ResetPasswordGuard } from '../../guards/login-redirectors/reset-password.guard';
import { LoginRedirectGuard } from '../../guards/login-redirectors/login-redirect.guard';
import { FirstChangePasswordRedirectGuard } from '../../guards/login-redirectors/first-change-password-redirect.guard';

import { ResetPasswordFormUnsaveChangesGuard } from '../../guards/route-leave-protector/reset-password-form-unsave-changes.guard';
import { ResetPasswordTokenUnsaveChangesGuard } from '../../guards/route-leave-protector/reset-password-token-unsave-changes.guard';

//----------------------------------------------------------------------------------------------------------------------

const routes: Routes = [
    {
        path: '', component: AuthPageComponent, children: [ {
            path: 'login',
            component: LoginPageComponent,
            canActivate: [ LoginRedirectGuard ],
        }, {
            path: 'send-token-to-reset-password',
            component: SendTokenViaEmailPageComponent,
            canActivate: [ LoginRedirectGuard ],
            canDeactivate: [ ResetPasswordTokenUnsaveChangesGuard ],
        }, {
            path: 'reset-password',
            component: ResetPasswordPageComponent,
            canActivate: [ LoginRedirectGuard, ResetPasswordGuard ],
            canDeactivate: [ ResetPasswordFormUnsaveChangesGuard ],
        }, {
            path: 'first-change-password',
            component: FirstChangePasswordPageComponent,
            canActivate: [ FirstChangePasswordRedirectGuard ],
        }, ],
    },
];

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AuthRoutingModule {}