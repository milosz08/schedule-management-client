/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { matArrowRightAlt } from '@ng-icons/material-icons/baseline';
import { CmsModule } from '~/cms-module/cms.module';
import { SharedModule } from '~/shared-module/shared.module';
import { CmsAdminRoutingModule } from './cms-admin-routing.module';
import { AddEditColumnWrapperComponent } from './components/add-edit-column-wrapper/add-edit-column-wrapper.component';
import { DeptWithCathComponent } from './components/dept-with-cath/dept-with-cath.component';
import { DeptWithStudySpecComponent } from './components/dept-with-study-spec/dept-with-study-spec.component';
import { CathedralAddEditPageComponent } from './pages/cathedral-add-edit-page/cathedral-add-edit-page.component';
import { CathedralsPageComponent } from './pages/cathedrals-page/cathedrals-page.component';
import { DepartmentAddEditPageComponent } from './pages/department-add-edit-page/department-add-edit-page.component';
import { DepartmentsPageComponent } from './pages/departments-page/departments-page.component';
import { StudyGroupAddPageComponent } from './pages/study-group-add-page/study-group-add-page.component';
import { StudyGroupsPageComponent } from './pages/study-groups-page/study-groups-page.component';
import { StudyRoomAddEditPageComponent } from './pages/study-room-add-edit-page/study-room-add-edit-page.component';
import { StudyRoomsPageComponent } from './pages/study-rooms-page/study-rooms-page.component';
import { StudySpecializationAddEditPageComponent } from './pages/study-specialization-add-edit-page/study-specialization-add-edit-page.component';
import { StudySpecializationsPageComponent } from './pages/study-specializations-page/study-specializations-page.component';
import { StudySubjectAddEditPageComponent } from './pages/study-subject-add-edit-page/study-subject-add-edit-page.component';
import { StudySubjectsPageComponent } from './pages/study-subjects-page/study-subjects-page.component';
import { UserAddEditPageComponent } from './pages/user-add-edit-page/user-add-edit-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { IsCreationModePipe } from './pipes/is-creation-mode/is-creation-mode.pipe';
import { IsEditModePipe } from './pipes/is-edit-mode/is-edit-mode.pipe';
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
    CathedralAddEditPageComponent,
    CathedralsPageComponent,
    DepartmentAddEditPageComponent,
    DepartmentsPageComponent,
    DeptWithCathComponent,
    DeptWithStudySpecComponent,
    IsCreationModePipe,
    IsEditModePipe,
    RoleToViewPipe,
    StudyGroupAddPageComponent,
    StudyGroupsPageComponent,
    StudyRoomAddEditPageComponent,
    StudyRoomsPageComponent,
    StudySpecializationAddEditPageComponent,
    StudySpecializationsPageComponent,
    StudySubjectAddEditPageComponent,
    StudySubjectsPageComponent,
    UserAddEditPageComponent,
    UsersPageComponent,
  ],
  imports: [
    CommonModule,
    CmsAdminRoutingModule,
    CmsModule,
    NgIconsModule.withIcons({
      matArrowRightAlt,
    }),
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
