/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-page.module.ts
 * Last modified | Ostatnia modyfikacja: 10/04/2022, 14:43
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
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CmsPageComponent } from './cms-page.component';
import { UsersCmsPageComponent } from './pages/users-cms-page/users-cms-page.component';
import { AccountCmsPageComponent } from './pages/account-cms-page/account-cms-page.component';
import { BookingsCmsPageComponent } from './pages/bookings-cms-page/bookings-cms-page.component';
import { CmsPanelHeaderComponent } from './components/cms-panel-header/cms-panel-header.component';
import { CmsPanelFooterComponent } from './components/cms-panel-footer/cms-panel-footer.component';
import { DashboardCmsPageComponent } from './pages/dashboard-cms-page/dashboard-cms-page.component';
import { CmsLeftNavigationComponent } from './components/cms-left-navigation/cms-left-navigation.component';

import { SharedModule } from '../shared-module/shared.module';
import { CmsPageRoutingModule } from './cms-page-routing.module';
import { SearchFormInputComponent } from './components/search-form-input/search-form-input.component';
import { AddNewUserCmsPageComponent } from './pages/add-new-user-cms-page/add-new-user-cms-page.component';
import { CmsUsersTableComponent } from './components/cms-users-table/cms-users-table.component';
import { CmsPaginationOptionsComponent } from './components/cms-pagination-options/cms-pagination-options.component';
import { CmsSortingButtonComponent } from './components/cms-sorting-button/cms-sorting-button.component';
import { SingleUserDetailsCmsPageComponent } from './pages/single-user-details-cms-page/single-user-details-cms-page.component';

import { LIST_NAVIGATIONS_REDUCER } from './ngrx-store/list-navigations-ngrx-store/list-navigations.selectors';
import { listNavigationsReducer } from './ngrx-store/list-navigations-ngrx-store/list-navigations.reducer';
import { ListNavigationsEffects } from './ngrx-store/list-navigations-ngrx-store/ngrx-effects/list-navigations.effects';

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        CmsPageComponent,
        DashboardCmsPageComponent,
        UsersCmsPageComponent,
        CmsPanelHeaderComponent,
        CmsPanelFooterComponent,
        CmsLeftNavigationComponent,
        AccountCmsPageComponent,
        BookingsCmsPageComponent,
        SearchFormInputComponent,
        AddNewUserCmsPageComponent,
        CmsUsersTableComponent,
        CmsPaginationOptionsComponent,
        CmsSortingButtonComponent,
        SingleUserDetailsCmsPageComponent,
    ],
    imports: [
        CommonModule,
        CmsPageRoutingModule,
        SharedModule,
        MatIconModule,
        ReactiveFormsModule,
        StoreModule.forFeature(LIST_NAVIGATIONS_REDUCER, listNavigationsReducer),
        EffectsModule.forFeature([
            ListNavigationsEffects,
        ]),
    ],
})
export class CmsPageModule {}