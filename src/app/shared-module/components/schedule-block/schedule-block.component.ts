/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Params } from '@angular/router';
import {
  AliasKey,
  WeekdayData,
} from '~/shared-module/models/schedule-data.model';
import { ScheduleSubjectModalService } from '~/shared-module/service/schedule-subject-modal/schedule-subject-modal.service';
import { ScheduleEntity } from '~/shared-module/types/schedule-entity.type';
import { ScheduleMark } from '~/shared-module/types/schedule-mark.type';

@Component({
  selector: 'app-schedule-block',
  templateUrl: './schedule-block.component.html',
  styleUrl: './schedule-block.component.scss',
})
export class ScheduleBlockComponent implements AfterViewInit {
  @Input() weekdayData?: WeekdayData;
  @Input() hrefEventsDisabled = false;
  @Input() addedPxFromTop = 0;
  @Input() isEditMode = false;

  @Output() scheduleMarkEmitter = new EventEmitter<ScheduleMark>();

  @ViewChild('container') container?: ElementRef;

  showFullContent = false;
  overflowBlockSize = false;

  constructor(
    private readonly _scheduleSubjectModalService: ScheduleSubjectModalService,
    private readonly _changeDetectionRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    const containerElement = this.container?.nativeElement;
    if (containerElement) {
      const { scrollHeight, clientHeight } = containerElement;
      this.overflowBlockSize = scrollHeight > clientHeight;
      this._changeDetectionRef.detectChanges();
    }
  }

  handleMarkScheduleSubject(isMarked: boolean): void {
    if (this.weekdayData) {
      this.scheduleMarkEmitter.emit({
        isMarked,
        subjectId: this.weekdayData?.scheduleSubjectId,
      });
    }
  }

  handleOpenDetailsModal(event: Event): void {
    event.stopPropagation();
    if (this.weekdayData) {
      this._scheduleSubjectModalService.openAndFetchScheduleSubjectData(
        this.weekdayData.scheduleSubjectId
      );
    }
  }

  disableEventPropagation(event: Event): void {
    event.stopPropagation();
  }

  fabricateRouteParams(baseParams: Params, routeFor: ScheduleEntity): Params {
    return { for: routeFor, ...baseParams };
  }

  hasKey(key: AliasKey): boolean {
    const aliases = this.weekdayData?.aliases;
    if (!aliases) {
      return false;
    }
    return (Object.keys(aliases) as AliasKey[]).some(
      aliasKey => aliasKey === key
    );
  }
}
