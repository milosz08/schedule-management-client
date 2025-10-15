import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LastOpenedSchedule } from '~/cms-editor-module/models/last-opened-schedule.model';
import { LastOpenedSchedulesService } from '~/cms-editor-module/services/last-opened-schedules/last-opened-schedules.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-last-opened-schedules',
  templateUrl: './last-opened-schedules.component.html',
  styleUrl: './last-opened-schedules.component.scss',
})
export class LastOpenedSchedulesComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  lastOpenedSchedules: LastOpenedSchedule[] = [];
  elementsToRemove: number[] = [];

  fetchingState$ = this._lastOpenedSchedulesService.fetchingState$;

  constructor(
    private readonly _lastOpenedSchedulesService: LastOpenedSchedulesService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._lastOpenedSchedulesService.fetchLastOpenedSchedules$()
    ).subscribe(
      lastOpenedSchedules => (this.lastOpenedSchedules = lastOpenedSchedules)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleLoadAgain(): void {
    this._lastOpenedSchedulesService.triggeredLoadAgain();
  }

  handleCheckSelectedSchedule(
    isSelected: boolean,
    selectedScheduleId: number
  ): void {
    if (isSelected) {
      this.elementsToRemove.push(selectedScheduleId);
    } else {
      const elements = [...this.elementsToRemove];
      this.elementsToRemove = elements.filter(el => el !== selectedScheduleId);
    }
  }

  async handleNavigateToSelectedSchedule({
    deptId,
    specId,
    groupId,
  }: LastOpenedSchedule): Promise<void> {
    await this._router.navigate(['/secure/editor/schedule-select/editor'], {
      queryParams: {
        deptId,
        specId,
        groupId,
      },
    });
  }

  handleDeleteAllLastOpenedSchedules(): void {
    this.wrapAsObservable$(
      this._lastOpenedSchedulesService.removeAll$()
    ).subscribe();
  }

  handleDeleteLastOpenedSchedules(): void {
    this.wrapAsObservable$(
      this._lastOpenedSchedulesService.removeSelected$(this.elementsToRemove)
    ).subscribe();
  }
}
