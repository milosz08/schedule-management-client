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
import { DashboardCmsPageComponent } from './pages/dashboard-cms-page/dashboard-cms-page.component';
import { CathedralsCmsPageComponent } from './pages/cathedrals-cms-page/cathedrals-cms-page.component';
import { StudyRoomsCmsPageComponent } from './pages/study-rooms-cms-page/study-rooms-cms-page.component';
import { DepartmentsCmsPageComponent } from './pages/departments-cms-page/departments-cms-page.component';
import { AddNewUserCmsPageComponent } from './pages/add-new-user-cms-page/add-new-user-cms-page.component';
import { StudySubjectsCmsPageComponent } from './pages/study-subjects-cms-page/study-subjects-cms-page.component';
import { AddNewCathedralCmsPageComponent } from './pages/add-new-cathedral-cms-page/add-new-cathedral-cms-page.component';
import { AddNewStudyRoomCmsPageComponent } from './pages/add-new-study-room-cms-page/add-new-study-room-cms-page.component';
import { AddNewDepartmentCmsPageComponent } from './pages/add-new-department-cms-page/add-new-department-cms-page.component';
import { SingleUserDetailsCmsPageComponent } from './pages/single-user-details-cms-page/single-user-details-cms-page.component';
import { StudySpecializationCmsPageComponent } from './pages/study-specialization-cms-page/study-specialization-cms-page.component';
import { AddNewStudySubjectCmsPageComponent } from './pages/add-new-study-subject-cms-page/add-new-study-subject-cms-page.component';
import { AddNewStudySpecializationCmsPageComponent } from './pages/add-new-study-specialization-cms-page/add-new-study-specialization-cms-page.component';

import { CmsUsersTableComponent } from './components/cms-users-table/cms-users-table.component';
import { CmsCathedralsTableComponent } from './components/cms-cathedrals-table/cms-cathedrals-table.component';
import { CmsStudyRoomsTableComponent } from './components/cms-study-rooms-table/cms-study-rooms-table.component';
import { CmsDepartmentsTableComponent } from './components/cms-departments-table/cms-departments-table.component';
import { CmsStudySubjectsTableComponent } from './components/cms-study-subjects-table/cms-study-subjects-table.component';
import { CmsStudySpecializationsTableComponent } from './components/cms-study-specializations-table/cms-study-specializations-table.component';

import { AddNewUserFormComponent } from './components/add-new-user-form/add-new-user-form.component';
import { AddNewCathedralFormComponent } from './components/add-new-cathedral-form/add-new-cathedral-form.component';
import { AddNewStudyRoomFormComponent } from './components/add-new-study-room-form/add-new-study-room-form.component';
import { AddNewDepartmentFormComponent } from './components/add-new-department-form/add-new-department-form.component';
import { AddNewStudySubjectFormComponent } from './components/add-new-study-subject-form/add-new-study-subject-form.component';
import { AddNewStudySpecializationFormComponent } from './components/add-new-study-specialization-form/add-new-study-specialization-form.component';

import { NewUserInformationsComponent } from './components/new-user-informations/new-user-informations.component';
import { NewCathedralInformationsComponent } from './components/new-cathedral-informations/new-cathedral-informations.component';
import { NewStudyRoomInformationsComponent } from './components/new-study-room-informations/new-study-room-informations.component';
import { NewDepartmentInformationsComponent } from './components/new-department-informations/new-department-informations.component';
import { NewStudySubjectInformationsComponent } from './components/new-study-subject-informations/new-study-subject-informations.component';
import { NewStudySpecializationInformationsComponent } from './components/new-study-specialization-informations/new-study-specialization-informations.component';

import { CmsPanelHeaderComponent } from './components/cms-panel-header/cms-panel-header.component';
import { CmsPanelFooterComponent } from './components/cms-panel-footer/cms-panel-footer.component';
import { SearchFormInputComponent } from './components/search-form-input/search-form-input.component';
import { CmsSortingButtonComponent } from './components/cms-sorting-button/cms-sorting-button.component';
import { CmsLeftNavigationComponent } from './components/cms-left-navigation/cms-left-navigation.component';
import { CmsPaginationOptionsComponent } from './components/cms-pagination-options/cms-pagination-options.component';
import { CmsListDeleteSingleElementComponent } from './components/cms-list-delete-single-element/cms-list-delete-single-element.component';
import { DepartmentWithCathedralInputsComponent } from './components/department-with-cathedral-inputs/department-with-cathedral-inputs.component';
import { CmsListElementRemovableWithPaginationComponent } from './components/cms-list-element-removable-with-pagination/cms-list-element-removable-with-pagination.component';

import { SharedModule } from '../shared-module/shared.module';
import { CmsPageRoutingModule } from './cms-page-routing.module';
import { TemplatesModule } from '../templates-module/templates.module';

import { LIST_NAVIGATIONS_REDUCER } from './ngrx-store/list-navigations-ngrx-store/list-navigations.selectors';
import { listNavigationsReducer } from './ngrx-store/list-navigations-ngrx-store/list-navigations.reducer';
import { DOM_MANIPULATION_REDUCER } from './ngrx-store/dom-manipulation-ngrx-store/dom-manipulation.selectors';
import { domManipulationReducer } from './ngrx-store/dom-manipulation-ngrx-store/dom-manipulation.reducer';
import { POST_DATA_REDUCER } from './ngrx-store/post-data-ngrx-store/post-data.selectors';
import { postDataReducer } from './ngrx-store/post-data-ngrx-store/post-data.reducer';

import { PostDataEffects } from './ngrx-store/post-data-ngrx-store/ngrx-effects/post-data.effects';
import { ListNavigationsEffects } from './ngrx-store/list-navigations-ngrx-store/ngrx-effects/list-navigations.effects';


//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        // widoki stron
        CmsPageComponent,
        UsersCmsPageComponent,
        AccountCmsPageComponent,
        BookingsCmsPageComponent,
        DashboardCmsPageComponent,
        StudyRoomsCmsPageComponent,
        CathedralsCmsPageComponent,
        DepartmentsCmsPageComponent,
        StudySubjectsCmsPageComponent,
        SingleUserDetailsCmsPageComponent,
        StudySpecializationCmsPageComponent,
        // strony (dodawanie kontentu)
        AddNewUserCmsPageComponent,
        AddNewStudyRoomCmsPageComponent,
        AddNewCathedralCmsPageComponent,
        AddNewDepartmentCmsPageComponent,
        AddNewStudySubjectCmsPageComponent,
        AddNewStudySpecializationCmsPageComponent,
        // formularze (dodawanie kontentu)
        AddNewUserFormComponent,
        AddNewCathedralFormComponent,
        AddNewStudyRoomFormComponent,
        AddNewDepartmentFormComponent,
        AddNewStudySubjectFormComponent,
        AddNewStudySpecializationFormComponent,
        // widoki tabel
        CmsUsersTableComponent,
        CmsStudyRoomsTableComponent,
        CmsCathedralsTableComponent,
        CmsDepartmentsTableComponent,
        CmsStudySubjectsTableComponent,
        CmsStudySpecializationsTableComponent,
        // widoki dodanych treści
        NewUserInformationsComponent,
        NewStudyRoomInformationsComponent,
        NewCathedralInformationsComponent,
        NewDepartmentInformationsComponent,
        NewStudySubjectInformationsComponent,
        NewStudySpecializationInformationsComponent,
        // inne
        CmsPanelHeaderComponent,
        CmsPanelFooterComponent,
        SearchFormInputComponent,
        CmsSortingButtonComponent,
        CmsLeftNavigationComponent,
        CmsPaginationOptionsComponent,
        CmsListDeleteSingleElementComponent,
        DepartmentWithCathedralInputsComponent,
        CmsListElementRemovableWithPaginationComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatIconModule,
        TemplatesModule,
        ReactiveFormsModule,
        CmsPageRoutingModule,
        StoreModule.forFeature(LIST_NAVIGATIONS_REDUCER, listNavigationsReducer),
        StoreModule.forFeature(DOM_MANIPULATION_REDUCER, domManipulationReducer),
        StoreModule.forFeature(POST_DATA_REDUCER, postDataReducer),
        EffectsModule.forFeature([
            PostDataEffects,
            ListNavigationsEffects,
        ]),
    ],
    exports: [
        CmsPaginationOptionsComponent
    ]
})
export class CmsPageModule {}