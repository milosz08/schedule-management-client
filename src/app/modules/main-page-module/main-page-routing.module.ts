/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: main-page-routing.module.ts
 * Last modified | Ostatnia modyfikacja: 10/04/2022, 01:09
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

import { MainPageComponent } from './main-page.component';

import { SearchPageComponent } from './pages/search-page/search-page.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { RootMainPageComponent } from './pages/root-main-page/root-main-page.component';
import { WelcomeSchedulePageComponent } from './pages/welcome-schedule-page/welcome-schedule-page.component';
import { SelectedSchedulePageComponent } from './pages/selected-schedule-page/selected-schedule-page.component';

//----------------------------------------------------------------------------------------------------------------------

const routes: Routes = [
    {
        path: '', component: MainPageComponent, children: [ {
            path: '',
            component: RootMainPageComponent
        }, {
            path: 'schedule',
            component: SchedulePageComponent, children: [ {
                path: '',
                component: WelcomeSchedulePageComponent,
            }, {
                path: 'selected-schedule/:scheduleType',
                component: SelectedSchedulePageComponent,
            } ],
        }, {
            path: 'booking',
            component: BookingPageComponent
        }, {
            path: 'search',
            component: SearchPageComponent
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
export class MainPageRoutingModule {}