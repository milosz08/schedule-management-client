/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: app-routing.module.ts
 * Last modified | Ostatnia modyfikacja: 09/04/2022, 04:58
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

import { AdminRedirectGuard } from './guards/login-redirectors/admin-redirect.guard';
import { LoginRedirectGuard } from './guards/login-redirectors/login-redirect.guard';

import { NotFoundPageComponent } from './modules/shared-module/pages/not-found-page/not-found.component';


const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/main-page-module/main-page.module').then(m => m.MainPageModule),
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth-module/auth-page.module').then(m => m.AuthPageModule),
        canActivate: [ LoginRedirectGuard ],
    },
    {
        path: 'secure',
        loadChildren: () => import('./modules/cms-panel-module/cms-page.module').then(m => m.CmsPageModule),
        canActivate: [ AdminRedirectGuard ],
    },
    { path: '**', component: NotFoundPageComponent },
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule {}