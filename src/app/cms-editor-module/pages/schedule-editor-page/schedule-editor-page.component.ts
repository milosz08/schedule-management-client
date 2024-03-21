/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScheduleActivityService } from '~/cms-editor-module/services/schedule-activity/schedule-activity.service';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { ScheduleDataRes } from '~/shared-module/models/schedule-data.model';
import { ScheduleSubjectModalService } from '~/shared-module/service/schedule-subject-modal/schedule-subject-modal.service';
import { NameWithId } from '~/shared-module/types/drop-lists-data.type';
import { ScheduleMark } from '~/shared-module/types/schedule-mark.type';

@Component({
  selector: 'app-schedule-editor-page',
  templateUrl: './schedule-editor-page.component.html',
  styleUrl: './schedule-editor-page.component.scss',
  providers: [
    ScheduleActivityService,
    DeleteContentService,
    ScheduleSubjectModalService,
  ],
})
export class ScheduleEditorPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  scheduleData?: ScheduleDataRes;
  scheduleSubjectIds: number[] = [];

  isDeleteContentEmpty$ = this._deleteContentService.isDeleteContentEmpty$;
  deleteContentLength$ = this._deleteContentService.deleteContentLength$;
  isDeleteModalOpen$ = this._deleteContentService.isOpen$;
  isDetailsModalOpen$ = this._scheduleSubjectModalService.isOpen$;
  isAddModalOpen$ = this._scheduleActivityService.isOpen$;

  constructor(
    private readonly _scheduleActivityService: ScheduleActivityService,
    private readonly _deleteContentService: DeleteContentService,
    private readonly _scheduleSubjectModalService: ScheduleSubjectModalService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._scheduleActivityService.listenRouteParameters$()
    ).subscribe();
    this._deleteContentService.setDeleteEndpoint('schedulesubject');
  }

  handleOpenAddActivityModal(selectedDay: NameWithId): void {
    this._scheduleActivityService.setIsOpen(true, selectedDay);
  }

  onFetchScheduleData(scheduleData: ScheduleDataRes): void {
    this.scheduleData = scheduleData;
    this.scheduleSubjectIds = scheduleData.scheduleCanvasData
      .map(d => d.weekdayData.map(d => d.scheduleSubjectId))
      .reduce((acc, subjectId) => acc.concat(subjectId));
  }

  handleDeleteAllScheduleSubjects(): void {
    this._deleteContentService.openDeleteContentModalForMultipleValues(
      this.scheduleSubjectIds
    );
  }

  handleMarkScheduleSubject(markData: ScheduleMark): void {
    const { subjectId, isMarked } = markData;
    this._deleteContentService.setDeleteContentIds(subjectId, isMarked);
  }

  handleDeleteScheduleSubjects(): void {
    this._deleteContentService.setIsOpen(true);
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
