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
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { SharedModule } from './modules/shared-module/shared.module';
import { TemplatesModule } from './modules/templates-module/templates.module';
import { JwtTokenInterceptor } from './interceptors/jwt-token.interceptor';

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        // Podstawowe importy
        RouterModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        // Importy stworzonych modułów w całej aplikacji
        SharedModule,
        TemplatesModule,
        // Dodanie globalnego ngrx flux store + ngrx middleware effects
        StoreModule.forRoot(combinedReducers),
        EffectsModule.forRoot([
            LoginSessionEffects,
            JwtSessionEffects,
            SavedUsersEffects,
            FirstChangePasswordEffects,
            SharedEffects,
        ]),
        // Devtoolsy żeby można było używać Redux Extension w przeglądarce (tylko wersja deweloperska)
        StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    ],
    providers: [
        DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {}