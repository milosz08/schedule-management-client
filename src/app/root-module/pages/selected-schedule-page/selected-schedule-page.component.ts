/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component } from '@angular/core';
import { RememberScheduleBarService } from '~/root-module/services/remember-schedule-bar/remember-schedule-bar.service';
import { ScheduleDataRes } from '~/shared-module/models/schedule-data.model';

@Component({
  selector: 'app-selected-schedule-page',
  templateUrl: './selected-schedule-page.component.html',
})
export class SelectedSchedulePageComponent {
  constructor(
    private readonly _rememberScheduleBarService: RememberScheduleBarService
  ) {}

  onFetchScheduleData(scheduleData: ScheduleDataRes): void {
    this._rememberScheduleBarService.addRememberContent(scheduleData);
  }
}
