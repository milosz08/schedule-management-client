/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CmsModule } from '~/cms-module/cms.module';
import { SharedModule } from '~/shared-module/shared.module';
import { CmsAdminRoutingModule } from './cms-admin-routing.module';
import { AddEditColumnWrapperComponent } from './components/add-edit-column-wrapper/add-edit-column-wrapper.component';
import { CathedralAddPageComponent } from './pages/cathedral-add-page/cathedral-add-page.component';
import { CathedralEditPageComponent } from './pages/cathedral-edit-page/cathedral-edit-page.component';
import { CathedralsPageComponent } from './pages/cathedrals-page/cathedrals-page.component';
import { DepartmentAddPageComponent } from './pages/department-add-page/department-add-page.component';
import { DepartmentEditPageComponent } from './pages/department-edit-page/department-edit-page.component';
import { DepartmentsPageComponent } from './pages/departments-page/departments-page.component';
import { StudyGroupAddPageComponent } from './pages/study-group-add-page/study-group-add-page.component';
import { StudyGroupsPageComponent } from './pages/study-groups-page/study-groups-page.component';
import { StudyRoomAddPageComponent } from './pages/study-room-add-page/study-room-add-page.component';
import { StudyRoomEditPageComponent } from './pages/study-room-edit-page/study-room-edit-page.component';
import { StudyRoomsPageComponent } from './pages/study-rooms-page/study-rooms-page.component';
import { StudySpecializationAddPageComponent } from './pages/study-specialization-add-page/study-specialization-add-page.component';
import { StudySpecializationEditPageComponent } from './pages/study-specialization-edit-page/study-specialization-edit-page.component';
import { StudySpecializationsPageComponent } from './pages/study-specializations-page/study-specializations-page.component';
import { StudySubjectAddPageComponent } from './pages/study-subject-add-page/study-subject-add-page.component';
import { StudySubjectEditPageComponent } from './pages/study-subject-edit-page/study-subject-edit-page.component';
import { StudySubjectsPageComponent } from './pages/study-subjects-page/study-subjects-page.component';
import { UserAddPageComponent } from './pages/user-add-page/user-add-page.component';
import { UserEditPageComponent } from './pages/user-edit-page/user-edit-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { RoleToViewPipe } from './pipes/role-to-view/role-to-view.pipe';
import { CathedralHttpClientService } from './services/cathedral-http-client/cathedral-http-client.service';
import { DepartmentHttpClientService } from './services/department-http-client/department-http-client.service';
import { StudyGroupHttpClientService } from './services/study-group-http-client/study-group-http-client.service';
import { StudyRoomHttpClientService } from './services/study-room-http-client/study-room-http-client.service';
import { StudySpecializationHttpClientService } from './services/study-specialization-http-client/study-specialization-http-client.service';
import { StudySubjectHttpClientService } from './services/study-subject-http-client/study-subject-http-client.service';
import { UserHttpClientService } from './services/user-http-client/user-http-client.service';

@NgModule({
  declarations: [
    AddEditColumnWrapperComponent,
    CathedralAddPageComponent,
    CathedralEditPageComponent,
    CathedralsPageComponent,
    DepartmentAddPageComponent,
    DepartmentEditPageComponent,
    DepartmentsPageComponent,
    RoleToViewPipe,
    StudyGroupAddPageComponent,
    StudyGroupsPageComponent,
    StudyRoomAddPageComponent,
    StudyRoomEditPageComponent,
    StudyRoomsPageComponent,
    StudySpecializationAddPageComponent,
    StudySpecializationEditPageComponent,
    StudySpecializationsPageComponent,
    StudySubjectAddPageComponent,
    StudySubjectEditPageComponent,
    StudySubjectsPageComponent,
    UserAddPageComponent,
    UserEditPageComponent,
    UsersPageComponent,
  ],
  imports: [
    CommonModule,
    CmsAdminRoutingModule,
    CmsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [
    CathedralHttpClientService,
    DepartmentHttpClientService,
    StudyGroupHttpClientService,
    StudyRoomHttpClientService,
    StudySpecializationHttpClientService,
    StudySubjectHttpClientService,
    UserHttpClientService,
  ],
  exports: [],
})
export class CmsAdminModule {}
