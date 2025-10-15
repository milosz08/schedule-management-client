import { Component, OnInit } from '@angular/core';
import { RememberScheduleBarService } from '~/root-module/services/remember-schedule-bar/remember-schedule-bar.service';

@Component({
  selector: 'app-remember-opened-schedule-bar',
  templateUrl: './remember-opened-schedule-bar.component.html',
  styleUrl: './remember-opened-schedule-bar.component.scss',
})
export class RememberOpenedScheduleBarComponent implements OnInit {
  loadedData$ = this._rememberScheduleBarService.loadedData$;

  constructor(
    private readonly _rememberScheduleBarService: RememberScheduleBarService
  ) {}

  ngOnInit(): void {
    this._rememberScheduleBarService.loadRememberScheduleData();
  }

  handleRemoveRememberElement(event: Event, scheduleName: string): void {
    event.preventDefault();
    event.stopPropagation();
    this._rememberScheduleBarService.removeSelectedSchedule(scheduleName);
  }
}
