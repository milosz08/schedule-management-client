/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: main-page.module.ts
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
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../shared-module/shared.module';
import { MainPageRoutingModule } from './main-page-routing.module';

import { MainPageComponent } from './main-page.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { RootMainPageComponent } from './pages/root-main-page/root-main-page.component';

import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { ScheduleDepartmentsListComponent } from './components/schedule-departments-list/schedule-departments-list.component';
import { ScheduleContentContainerComponent } from './components/schedule-content-container/schedule-content-container.component';
import { ScheduleNextLevelTreeListComponent } from './components/schedule-next-level-tree-list/schedule-next-level-tree-list.component';
import { ScheduleSecondLevelTreeListComponent } from './components/schedule-second-level-tree-list/schedule-second-level-tree-list.component';

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        // widoki stron
        MainPageComponent,
        BookingPageComponent,
        SearchPageComponent,
        SchedulePageComponent,
        RootMainPageComponent,
        // komponenty
        MainHeaderComponent,
        MainFooterComponent,
        ScheduleDepartmentsListComponent,
        ScheduleContentContainerComponent,
        ScheduleNextLevelTreeListComponent,
        ScheduleSecondLevelTreeListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MainPageRoutingModule,
        MatIconModule,
    ],
})
export class MainPageModule {}