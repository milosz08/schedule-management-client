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
import { CmsEditorRoutingModule } from './cms-editor-routing.module';
import { ScheduleEditorPageComponent } from './pages/schedule-editor-page/schedule-editor-page.component';
import { ScheduleSelectPageComponent } from './pages/schedule-select-page/schedule-select-page.component';
import { UserMessagePageComponent } from './pages/user-message-page/user-message-page.component';
import { UserMessagesPageComponent } from './pages/user-messages-page/user-messages-page.component';

@NgModule({
  declarations: [
    ScheduleEditorPageComponent,
    ScheduleSelectPageComponent,
    UserMessagePageComponent,
    UserMessagesPageComponent,
  ],
  imports: [
    CommonModule,
    CmsEditorRoutingModule,
    CmsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [],
  exports: [],
})
export class CmsEditorModule {}
