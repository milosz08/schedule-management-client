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
import { EditUserCmsPageComponent } from './pages/edit-user-cms-page/edit-user-cms-page.component';
import { DashboardCmsPageComponent } from './pages/dashboard-cms-page/dashboard-cms-page.component';
import { CathedralsCmsPageComponent } from './pages/cathedrals-cms-page/cathedrals-cms-page.component';
import { StudyRoomsCmsPageComponent } from './pages/study-rooms-cms-page/study-rooms-cms-page.component';
import { DepartmentsCmsPageComponent } from './pages/departments-cms-page/departments-cms-page.component';
import { AddNewUserCmsPageComponent } from './pages/add-new-user-cms-page/add-new-user-cms-page.component';
import { StudyGroupsCmsPageComponent } from './pages/study-groups-cms-page/study-groups-cms-page.component';
import { StudySubjectsCmsPageComponent } from './pages/study-subjects-cms-page/study-subjects-cms-page.component';
import { UsersMessagesCmsPageComponent } from './pages/users-messages-cms-page/users-messages-cms-page.component';
import { AddNewCathedralCmsPageComponent } from './pages/add-new-cathedral-cms-page/add-new-cathedral-cms-page.component';
import { AddNewStudyRoomCmsPageComponent } from './pages/add-new-study-room-cms-page/add-new-study-room-cms-page.component';
import { AddNewDepartmentCmsPageComponent } from './pages/add-new-department-cms-page/add-new-department-cms-page.component';
import { StudySpecializationCmsPageComponent } from './pages/study-specialization-cms-page/study-specialization-cms-page.component';
import { AddNewStudySubjectCmsPageComponent } from './pages/add-new-study-subject-cms-page/add-new-study-subject-cms-page.component';
import { AddNewStudySpecializationCmsPageComponent } from './pages/add-new-study-specialization-cms-page/add-new-study-specialization-cms-page.component';

import { CmsUsersTableComponent } from './components/cms-users-table/cms-users-table.component';
import { CmsCathedralsTableComponent } from './components/cms-cathedrals-table/cms-cathedrals-table.component';
import { CmsStudyRoomsTableComponent } from './components/cms-study-rooms-table/cms-study-rooms-table.component';
import { CmsDepartmentsTableComponent } from './components/cms-departments-table/cms-departments-table.component';
import { CmsStudyGroupsTableComponent } from './components/cms-study-groups-table/cms-study-groups-table.component';
import { CmsStudySubjectsTableComponent } from './components/cms-study-subjects-table/cms-study-subjects-table.component';
import { CmsStudySpecializationsTableComponent } from './components/cms-study-specializations-table/cms-study-specializations-table.component';

import { AddUpdateUserFormComponent } from './components/add-update-user-form/add-update-user-form.component';
import { AddUpdateCathedralFormComponent } from './components/add-update-cathedral-form/add-update-cathedral-form.component';
import { AddUpdateStudyRoomFormComponent } from './components/add-update-study-room-form/add-update-study-room-form.component';
import { AddUpdateDepartmentFormComponent } from './components/add-update-department-form/add-update-department-form.component';
import { AddUpdateStudyGroupFormComponent } from './components/add-update-study-group-form/add-update-study-group-form.component';
import { AddUpdateStudySubjectFormComponent } from './components/add-update-study-subject-form/add-update-study-subject-form.component';
import { AddNewStudyGroupCmsPageComponent } from './pages/add-new-study-group-cms-page/add-new-study-group-cms-page.component';
import { AddUpdateStudySpecializationFormComponent } from './components/add-update-study-specialization-form/add-update-study-specialization-form.component';

import { NewUpdatableUserInformationsComponent } from './components/new-updatable-user-informations/new-updatable-user-informations.component';
import { NewUpdatableCathedralInformationsComponent } from './components/new-updatable-cathedral-informations/new-updatable-cathedral-informations.component';
import { NewUpdatableStudyRoomInformationsComponent } from './components/new-updatable-study-room-informations/new-updatable-study-room-informations.component';
import { NewUpdatableDepartmentInformationsComponent } from './components/new-updatable-department-informations/new-updatable-department-informations.component';
import { NewUpdatableStudyGroupInformationsComponent } from './components/new-updatable-study-group-informations/new-updatable-study-group-informations.component';
import { NewUpdatableStudySubjectInformationsComponent } from './components/new-updatable-study-subject-informations/new-updatable-study-subject-informations.component';
import { NewUpdatableStudySpecializationInformationsComponent } from './components/new-updatable-study-specialization-informations/new-updatable-study-specialization-informations.component';

import { EditCathedralCmsPageComponent } from './pages/edit-cathedral-cms-page/edit-cathedral-cms-page.component';
import { EditStudyRoomCmsPageComponent } from './pages/edit-study-room-cms-page/edit-study-room-cms-page.component';
import { EditDepartmentCmsPageComponent } from './pages/edit-department-cms-page/edit-department-cms-page.component';
import { EditStudySubjectCmsPageComponent } from './pages/edit-study-subject-cms-page/edit-study-subject-cms-page.component';
import { EditStudySpecializationCmsPageComponent } from './pages/edit-study-specialization-cms-page/edit-study-specialization-cms-page.component';

import { ScheduleCmsPageComponent } from './pages/schedule-cms-page/schedule-cms-page.component';
import { ChooseScheduleCmsPageComponent } from './pages/choose-schedule-cms-page/choose-schedule-cms-page.component';

import { CmsPanelHeaderComponent } from './components/cms-panel-header/cms-panel-header.component';
import { CmsPanelFooterComponent } from './components/cms-panel-footer/cms-panel-footer.component';
import { SearchFormInputComponent } from './components/search-form-input/search-form-input.component';
import { MyMessagesCmsPageComponent } from './pages/my-messages-cms-page/my-messages-cms-page.component';
import { CmsSortingButtonComponent } from './components/cms-sorting-button/cms-sorting-button.component';
import { CmsLeftNavigationComponent } from './components/cms-left-navigation/cms-left-navigation.component';
import { CmsPaginationOptionsComponent } from './components/cms-pagination-options/cms-pagination-options.component';
import { DashboardUserConnectionsComponent } from './components/dashboard-user-connections/dashboard-user-connections.component';
import { DashboardUserDetailsPanelComponent } from './components/dashboard-user-details-panel/dashboard-user-details-panel.component';
import { DashboardDatabaseRolesPlotComponent } from './components/dashboard-database-roles-plot/dashboard-database-roles-plot.component';
import { CmsDepartmentWithStudySpecComponent } from './components/cms-department-with-study-spec/cms-department-with-study-spec.component';
import { CmsListDeleteSingleElementComponent } from './components/cms-list-delete-single-element/cms-list-delete-single-element.component';
import { CmsChooseScheduleFormEditorComponent } from './components/cms-choose-schedule-form-editor/cms-choose-schedule-form-editor.component';
import { AddEditScheduleActivityFormComponent } from './components/add-edit-schedule-activity-form/add-edit-schedule-activity-form.component';
import { AddEditScheduleActivityModalComponent } from './components/add-edit-schedule-activity-modal/add-edit-schedule-activity-modal.component';
import { DashboardDatabaseElementsPlotComponent } from './components/dashboard-database-elements-plot/dashboard-database-elements-plot.component';
import { DepartmentWithCathedralInputsComponent } from './components/department-with-cathedral-inputs/department-with-cathedral-inputs.component';
import { CmsUserSubjectOrSpecsComboBoxComponent } from './components/cms-user-subject-or-specs-combo-box/cms-user-subject-or-specs-combo-box.component';
import { CmsChooseScheduleFormAdministratorComponent } from './components/cms-choose-schedule-form-administrator/cms-choose-schedule-form-administrator.component';
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
import { SCHEDULE_MANIPULATOR_REDUCER } from './ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.selectors';
import { scheduleManipulatorReducer } from './ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.reducer';

import { PostPutDataEffects } from './ngrx-store/post-data-ngrx-store/ngrx-effects/post-put-data-effects.service';
import { ListNavigationsEffects } from './ngrx-store/list-navigations-ngrx-store/ngrx-effects/list-navigations.effects';
import { ScheduleManipulatorEffects } from './ngrx-store/schedule-manipulator-ngrx-store/ngrx-effects/schedule-manipulator.effects';
import { CmsMyMessagesTableComponent } from './components/cms-my-messages-table/cms-my-messages-table.component';
import { CmsUsersMessagesTableComponent } from './components/cms-users-messages-table/cms-users-messages-table.component';
import { SingleMessageCmsPageComponent } from './pages/single-message-cms-page/single-message-cms-page.component';

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        // widoki stron
        CmsPageComponent,
        UsersCmsPageComponent,
        EditUserCmsPageComponent,
        ScheduleCmsPageComponent,
        DashboardCmsPageComponent,
        StudyRoomsCmsPageComponent,
        MyMessagesCmsPageComponent,
        CathedralsCmsPageComponent,
        StudyGroupsCmsPageComponent,
        DepartmentsCmsPageComponent,
        UsersMessagesCmsPageComponent,
        StudySubjectsCmsPageComponent,
        SingleMessageCmsPageComponent,
        ChooseScheduleCmsPageComponent,
        StudySpecializationCmsPageComponent,
        // strony (dodawanie kontentu)
        AddNewUserCmsPageComponent,
        AddNewStudyRoomCmsPageComponent,
        AddNewCathedralCmsPageComponent,
        AddNewDepartmentCmsPageComponent,
        AddNewStudySubjectCmsPageComponent,
        AddNewStudySpecializationCmsPageComponent,
        // formularze (dodawanie kontentu)
        AddUpdateUserFormComponent,
        AddUpdateCathedralFormComponent,
        AddUpdateStudyRoomFormComponent,
        AddUpdateDepartmentFormComponent,
        AddUpdateStudyGroupFormComponent,
        AddUpdateStudySubjectFormComponent,
        AddNewStudyGroupCmsPageComponent,
        AddUpdateStudySpecializationFormComponent,
        // widoki tabel
        CmsUsersTableComponent,
        CmsStudyRoomsTableComponent,
        CmsCathedralsTableComponent,
        CmsMyMessagesTableComponent,
        CmsStudyGroupsTableComponent,
        CmsDepartmentsTableComponent,
        CmsUsersMessagesTableComponent,
        CmsStudySubjectsTableComponent,
        CmsStudySpecializationsTableComponent,
        // widoki dodanych treści
        NewUpdatableUserInformationsComponent,
        NewUpdatableStudyRoomInformationsComponent,
        NewUpdatableCathedralInformationsComponent,
        NewUpdatableDepartmentInformationsComponent,
        NewUpdatableStudyGroupInformationsComponent,
        NewUpdatableStudySubjectInformationsComponent,
        NewUpdatableStudySpecializationInformationsComponent,
        // widoki edycji treści
        EditStudyRoomCmsPageComponent,
        EditCathedralCmsPageComponent,
        EditDepartmentCmsPageComponent,
        EditStudySubjectCmsPageComponent,
        EditStudySpecializationCmsPageComponent,
        // inne
        CmsPanelHeaderComponent,
        CmsPanelFooterComponent,
        SearchFormInputComponent,
        CmsSortingButtonComponent,
        CmsLeftNavigationComponent,
        CmsPaginationOptionsComponent,
        DashboardUserConnectionsComponent,
        DashboardUserDetailsPanelComponent,
        DashboardDatabaseRolesPlotComponent,
        CmsDepartmentWithStudySpecComponent,
        CmsListDeleteSingleElementComponent,
        AddEditScheduleActivityFormComponent,
        CmsChooseScheduleFormEditorComponent,
        AddEditScheduleActivityModalComponent,
        DepartmentWithCathedralInputsComponent,
        DashboardDatabaseElementsPlotComponent,
        CmsUserSubjectOrSpecsComboBoxComponent,
        CmsChooseScheduleFormAdministratorComponent,
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
        StoreModule.forFeature(SCHEDULE_MANIPULATOR_REDUCER, scheduleManipulatorReducer),
        EffectsModule.forFeature([
            PostPutDataEffects,
            ListNavigationsEffects,
            ScheduleManipulatorEffects,
        ]),
    ],
    exports: [
        CmsPaginationOptionsComponent,
        CmsListDeleteSingleElementComponent
    ]
})
export class CmsPageModule {}