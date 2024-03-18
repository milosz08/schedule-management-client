/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, Input } from '@angular/core';
import { ScheduleActivityService } from '~/cms-editor-module/services/schedule-activity/schedule-activity.service';

@Component({
  selector: 'app-schedule-chooser-submit',
  templateUrl: './schedule-chooser-submit.component.html',
  host: { class: 'app-cms__grid-submit-button' },
})
export class ScheduleChooserSubmitComponent {
  @Input() isFormInvalid = false;

  isSelecting$ = this._scheduleActivityService.isSelecting$;

  constructor(
    private readonly _scheduleActivityService: ScheduleActivityService
  ) {}
}
