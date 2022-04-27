/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-page-routing.module.ts
 * Last modified | Ostatnia modyfikacja: 27/04/2022, 10:06
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

import { EditorRedirectGuard } from '../../guards/cms-roles-redirectors/editor-redirect.guard';

import { CmsPageComponent } from './cms-page.component';
import { DashboardCmsPageComponent } from './pages/dashboard-cms-page/dashboard-cms-page.component';
import { UsersCmsPageComponent } from './pages/users-cms-page/users-cms-page.component';
import { NotFoundPageComponent } from '../shared-module/pages/not-found-page/not-found.component';


const routes: Routes = [
    {
        path: 'panel', component: CmsPageComponent, children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardCmsPageComponent },
            { path: 'users', component: UsersCmsPageComponent, canActivate: [ EditorRedirectGuard ] },
            { path: '**', component: NotFoundPageComponent, pathMatch: 'full' },
        ],
    },
    { path: '', redirectTo: 'admin-panel', pathMatch: 'full' },
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule,
    ],
})
export class CmsPageRoutingModule {}