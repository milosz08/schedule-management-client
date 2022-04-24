/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: shared.module.ts
 * Last modified | Ostatnia modyfikacja: 10/04/2022, 00:52
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

import { NotFoundPageComponent } from './pages/not-found-page/not-found.component';

import { UserImageComponent } from './components/user-image/user-image.component';
import { UserDetailsPopupComponent } from './components/user-details-popup/user-details-popup.component';
import { LoadingSuspenseCardComponent } from './components/loading-suspense-card/loading-suspense-card.component';
import { UserHeaderDataWithPopupComponent } from './components/user-header-data-with-popup/user-header-data-with-popup.component';

import { SuspenseService } from './services/suspense.service';


@NgModule({
    declarations: [
        // strony
        NotFoundPageComponent,
        // komponenty
        UserImageComponent,
        UserDetailsPopupComponent,
        LoadingSuspenseCardComponent,
        UserHeaderDataWithPopupComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
    ],
    providers: [
        SuspenseService,
    ],
    exports: [
        LoadingSuspenseCardComponent,
        UserHeaderDataWithPopupComponent,
    ],
})
export class SharedModule {}