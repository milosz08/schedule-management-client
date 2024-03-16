/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '~/shared-module/pages/not-found-page/not-found-page.component';
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

const routes: Routes = [
  {
    path: 'cathedrals',
    component: CathedralsPageComponent,
    title: 'Katedry',
  },
  {
    path: 'cathedrals/add',
    component: CathedralAddEditPageComponent,
    data: { mode: 'add' },
    title: 'Dodaj katedrę',
  },
  {
    path: 'cathedrals/edit/:id',
    component: CathedralAddEditPageComponent,
    data: { mode: 'edit' },
    title: 'Edytuj katedrę',
  },
  {
    path: 'departments',
    component: DepartmentsPageComponent,
    title: 'Wydziały',
  },
  {
    path: 'departments/add',
    component: DepartmentAddEditPageComponent,
    data: { mode: 'add' },
    title: 'Dodaj wydział',
  },
  {
    path: 'departments/edit/:id',
    component: DepartmentAddEditPageComponent,
    data: { mode: 'edit' },
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
    component: StudyRoomAddEditPageComponent,
    data: { mode: 'add' },
    title: 'Dodaj salę',
  },
  {
    path: 'study-rooms/edit/:id',
    component: StudyRoomAddEditPageComponent,
    data: { mode: 'edit' },
    title: 'Edytuj salę',
  },
  {
    path: 'study-specializations',
    component: StudySpecializationsPageComponent,
    title: 'Kierunki studiów',
  },
  {
    path: 'study-specializations/add',
    component: StudySpecializationAddEditPageComponent,
    data: { mode: 'add' },
    title: 'Dodaj kierunek studiów',
  },
  {
    path: 'study-specializations/edit/:id',
    component: StudySpecializationAddEditPageComponent,
    data: { mode: 'edit' },
    title: 'Edytuj kierunek studiów',
  },
  {
    path: 'study-subjects',
    component: StudySubjectsPageComponent,
    title: 'Przedmioty',
  },
  {
    path: 'study-subjects/add',
    component: StudySubjectAddEditPageComponent,
    data: { mode: 'add' },
    title: 'Dodaj przedmiot',
  },
  {
    path: 'study-subjects/edit/:id',
    component: StudySubjectAddEditPageComponent,
    data: { mode: 'edit' },
    title: 'Edytuj przedmiot',
  },
  {
    path: 'users',
    component: UsersPageComponent,
    title: 'Użytkownicy',
  },
  {
    path: 'users/add',
    component: UserAddEditPageComponent,
    data: { mode: 'add' },
    title: 'Dodaj użytkownika',
  },
  {
    path: 'users/edit/:id',
    component: UserAddEditPageComponent,
    data: { mode: 'edit' },
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
