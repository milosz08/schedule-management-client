/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '~/shared-module/pages/not-found-page/not-found-page.component';
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

const routes: Routes = [
  {
    path: 'cathedrals',
    component: CathedralsPageComponent,
    title: 'Katedry',
  },
  {
    path: 'cathedrals/add',
    component: CathedralAddPageComponent,
    title: 'Dodaj katedrę',
  },
  {
    path: 'cathedrals/edit/:cathId',
    component: CathedralEditPageComponent,
    title: 'Edytuj katedrę',
  },
  {
    path: 'departments',
    component: DepartmentsPageComponent,
    title: 'Wydziały',
  },
  {
    path: 'departments/add',
    component: DepartmentAddPageComponent,
    title: 'Dodaj wydział',
  },
  {
    path: 'departments/edit/:deptId',
    component: DepartmentEditPageComponent,
    title: 'Edytuj wydział',
  },
  {
    path: 'study-groups',
    component: StudyGroupsPageComponent,
    title: 'Grupy',
  },
  {
    path: 'study-groups/add',
    component: StudyGroupAddPageComponent,
    title: 'Dodaj grupę',
  },
  {
    path: 'study-rooms',
    component: StudyRoomsPageComponent,
    title: 'Sale',
  },
  {
    path: 'study-rooms/add',
    component: StudyRoomAddPageComponent,
    title: 'Dodaj salę',
  },
  {
    path: 'study-rooms/edit/:roomId',
    component: StudyRoomEditPageComponent,
    title: 'Edytuj salę',
  },
  {
    path: 'study-specializations',
    component: StudySpecializationsPageComponent,
    title: 'Kierunki studiów',
  },
  {
    path: 'study-specializations/add',
    component: StudySpecializationAddPageComponent,
    title: 'Dodaj kierunek studiów',
  },
  {
    path: 'study-specializations/edit/:specId',
    component: StudySpecializationEditPageComponent,
    title: 'Edytuj kierunek studiów',
  },
  {
    path: 'study-subjects',
    component: StudySubjectsPageComponent,
    title: 'Przedmioty',
  },
  {
    path: 'study-subjects/add',
    component: StudySubjectAddPageComponent,
    title: 'Dodaj przedmiot',
  },
  {
    path: 'study-subjects/edit/:subjId',
    component: StudySubjectEditPageComponent,
    title: 'Edytuj przedmiot',
  },
  {
    path: 'users',
    component: UsersPageComponent,
    title: 'Użytkownicy',
  },
  {
    path: 'users/add',
    component: UserAddPageComponent,
    title: 'Dodaj użytkownika',
  },
  {
    path: 'users/edit/:userId',
    component: UserEditPageComponent,
    title: 'Edytuj użytkownika',
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: '404',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmsAdminRoutingModule {}
