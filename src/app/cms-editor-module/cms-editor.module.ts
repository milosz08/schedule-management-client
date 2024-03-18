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
import { CmsEditorRoutingModule } from './cms-editor-routing.module';
import { AdminScheduleChooserComponent } from './components/admin-schedule-chooser/admin-schedule-chooser.component';
import { EditorScheduleChooserComponent } from './components/editor-schedule-chooser/editor-schedule-chooser.component';
import { ScheduleChooserSubmitComponent } from './components/schedule-chooser-submit/schedule-chooser-submit.component';
import { ScheduleEditorPageComponent } from './pages/schedule-editor-page/schedule-editor-page.component';
import { ScheduleSelectPageComponent } from './pages/schedule-select-page/schedule-select-page.component';
import { UserMessagePageComponent } from './pages/user-message-page/user-message-page.component';
import { UserMessagesPageComponent } from './pages/user-messages-page/user-messages-page.component';
import { ScheduleActivityHttpClientService } from './services/schedule-activity-http-client/schedule-activity-http-client.service';
import { ScheduleSelectorHttpClientService } from './services/schedule-selector-http-client/schedule-selector-http-client.service';

@NgModule({
  declarations: [
    AdminScheduleChooserComponent,
    EditorScheduleChooserComponent,
    ScheduleEditorPageComponent,
    ScheduleChooserSubmitComponent,
    ScheduleSelectPageComponent,
    UserMessagePageComponent,
    UserMessagesPageComponent,
  ],
  imports: [
    CommonModule,
    CmsEditorRoutingModule,
    CmsModule,
    NgIconsModule.withIcons({
      matArrowRightAlt,
    }),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [
    ScheduleActivityHttpClientService,
    ScheduleSelectorHttpClientService,
  ],
  exports: [],
})
export class CmsEditorModule {}
