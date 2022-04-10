/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: app.module.ts
 * Last modified | Ostatnia modyfikacja: 05/04/2022, 23:55
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
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { combinedReducers } from './store/combine-reducers';

import { MainPageModule } from './modules/main-page-module/main-page.module';
import { AdminPageModule } from './modules/admin-panel-module/admin-page.module';
import { SharedModule } from './modules/shared-module/shared.module';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        // Podstawowe importy
        RouterModule,
        BrowserModule,
        AppRoutingModule,
        // Importy stworzonych modułów w całej aplikacji
        MainPageModule,
        AdminPageModule,
        SharedModule,
        // Dodanie globalnego ngrx flux store + ngrx middleware effects
        StoreModule.forRoot(combinedReducers),
        EffectsModule.forRoot([]),
        // Devtoolsy żeby można było używać Redux Extension w przeglądarce (tylko wersja deweloperska)
        StoreDevtoolsModule.instrument({ logOnly: environment.production })
    ],
    providers: [],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {}