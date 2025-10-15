import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScheduleCanvasService } from '~/shared-module/service/schedule-canvas/schedule-canvas.service';
import { ScheduleFilterService } from '~/shared-module/service/schedule-filter/schedule-filter.service';
import { AbstractReactiveProvider } from '../abstract-reactive-provider';

@Component({
  selector: 'app-schedule-nav-filter-panel',
  templateUrl: './schedule-nav-filter-panel.component.html',
  styleUrl: './schedule-nav-filter-panel.component.scss',
})
export class ScheduleNavFilterPanelComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() filterForm!: FormGroup;

  buttonsBlocked$ = this._scheduleCanvasService.buttonsBlocked$;

  isBlockPrev$ = this._scheduleFilterService.isBlockPrev$;
  isBlockNext$ = this._scheduleFilterService.isBlockNext$;
  yearsData$ = this._scheduleFilterService.yearsData$;
  weeksData$ = this._scheduleFilterService.weeksData$;

  constructor(
    private readonly _scheduleFilterService: ScheduleFilterService,
    private readonly _scheduleCanvasService: ScheduleCanvasService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._scheduleFilterService.fetchFormDates$(this.filterForm)
    ).subscribe();
    this.wrapAsObservable$(
      this._scheduleFilterService.toggleButtonsState$()
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleGotoPrevWeek(): void {
    this._scheduleFilterService.toPrevWeek(this.filterForm);
  }

  handleGotoNextWeek(): void {
    this._scheduleFilterService.toNextWeek(this.filterForm);
  }

  handleRestoreCurrentWeek(): void {
    this._scheduleFilterService.restoreCurrentWeek(this.filterForm);
  }

  handleSubmitYear(yearData: string): void {
    this._scheduleCanvasService.setYear(yearData);
    this._scheduleCanvasService.setWeek('Pokaż wszystko');
    this.filterForm.get('selectedWeekData')?.patchValue('Pokaż wszystko');
  }

  handleSubmitWeek(weekData: string): void {
    this._scheduleCanvasService.setWeek(weekData);
  }
}
