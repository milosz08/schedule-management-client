import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ScheduleDataRes } from '~/shared-module/models/schedule-data.model';
import { ScheduleCanvasService } from '~/shared-module/service/schedule-canvas/schedule-canvas.service';
import { ScheduleFilterService } from '~/shared-module/service/schedule-filter/schedule-filter.service';
import { ScheduleMark } from '~/shared-module/types/schedule-mark.type';
import {
  fabricateHoursTable,
  getCurrentStudyYear,
  getCurrentWeek,
} from '~/shared-module/utils/date.utils';
import { AbstractReactiveProvider } from '../abstract-reactive-provider';

@Component({
  selector: 'app-schedule-canvas',
  templateUrl: './schedule-canvas.component.html',
  providers: [ScheduleCanvasService, ScheduleFilterService],
})
export class ScheduleCanvasComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() isEditMode = false;
  @Input() addedFromTop = 60;
  @Input()
  scheduleTypeFor?: keyof typeof ScheduleCanvasService.ROUTE_MANAGER_QUERY_MAP;

  @Output() fetchScheduleDataEmitter = new EventEmitter<ScheduleDataRes>();
  @Output() scheduleMarkEmitter = new EventEmitter<ScheduleMark>();

  @ContentChild(TemplateRef) addButtonSectionRef!: TemplateRef<unknown> | null;

  hoursData = fabricateHoursTable();

  filterForm: FormGroup;
  scheduleData: ScheduleDataRes | undefined;

  onErrorMessage$ = this._scheduleCanvasService.onErrorMessage$;
  fetchingState$ = this._scheduleCanvasService.fetchingState$;
  isLoading$ = this._scheduleCanvasService.isLoading$;
  retryFetchEnabled$ = this._scheduleCanvasService.retryFetchEnabled$;
  scheduleType$ = this._scheduleCanvasService.scheduleType$;
  week$ = this._scheduleCanvasService.week$;
  isRefetching$ = this._scheduleCanvasService.isRefetching$;

  constructor(
    private readonly _scheduleCanvasService: ScheduleCanvasService,
    private readonly _route: ActivatedRoute
  ) {
    super();
    this.filterForm = new FormGroup({
      selectedWeekData: new FormControl(getCurrentWeek(), [
        Validators.required,
      ]),
      selectedStudyYear: new FormControl(getCurrentStudyYear(), [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._scheduleCanvasService.saveScheduleFetchType$(
        this.filterForm,
        this._route,
        this.scheduleTypeFor
      )
    ).subscribe(scheduleData => {
      this.fetchScheduleDataEmitter.emit(scheduleData);
      this.scheduleData = scheduleData;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleScheduleMarkEmitter(markData: ScheduleMark): void {
    if (this.isEditMode) {
      this.scheduleMarkEmitter.emit(markData);
    }
  }

  areSomeDataExist(isEmpty: boolean): boolean {
    return (
      !this.scheduleData?.scheduleCanvasData.every(
        d => !d.weekdayData.length
      ) && isEmpty
    );
  }

  handleLoadAgain(): void {
    this._scheduleCanvasService.retryFetch();
  }
}
