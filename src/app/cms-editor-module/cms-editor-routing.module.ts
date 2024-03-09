/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '~/shared-module/pages/not-found-page/not-found-page.component';
import { ScheduleEditorPageComponent } from './pages/schedule-editor-page/schedule-editor-page.component';
import { ScheduleSelectPageComponent } from './pages/schedule-select-page/schedule-select-page.component';
import { UserMessagePageComponent } from './pages/user-message-page/user-message-page.component';
import { UserMessagesPageComponent } from './pages/user-messages-page/user-messages-page.component';

const routes: Routes = [
  {
    path: 'users-messages',
    component: UserMessagesPageComponent,
    title: 'Wiadomości użytkowników',
  },
  {
    path: 'users-messages/details/:messId',
    component: UserMessagePageComponent,
    title: 'Szczegóły wiadomości',
  },
  {
    path: 'schedule-select',
    component: ScheduleSelectPageComponent,
    title: 'Wybierz element edycji',
  },
  {
    path: 'schedule-select/editor',
    component: ScheduleEditorPageComponent,
    title: 'Edytor',
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
export class CmsEditorRoutingModule {}
