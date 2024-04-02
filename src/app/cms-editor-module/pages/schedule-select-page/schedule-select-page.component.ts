/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component } from '@angular/core';
import { LastOpenedSchedulesService } from '~/cms-editor-module/services/last-opened-schedules/last-opened-schedules.service';
import { ScheduleActivityService } from '~/cms-editor-module/services/schedule-activity/schedule-activity.service';
import { ScheduleSelectorService } from '~/cms-editor-module/services/schedule-selector/schedule-selector.service';
import { IdentityService } from '~/shared-module/service/identity/identity.service';

@Component({
  selector: 'app-schedule-select-page',
  templateUrl: './schedule-select-page.component.html',
  styleUrl: './schedule-select-page.component.scss',
  host: { class: 'app__main-flex-columned' },
  providers: [
    ScheduleActivityService,
    ScheduleSelectorService,
    LastOpenedSchedulesService,
  ],
})
export class ScheduleSelectPageComponent {
  userRole$ = this._identityService.loggedUserRole$;
  loggedUserDepartment$ = this._identityService.loggedUserDepartment$;

  constructor(private readonly _identityService: IdentityService) {}
}
