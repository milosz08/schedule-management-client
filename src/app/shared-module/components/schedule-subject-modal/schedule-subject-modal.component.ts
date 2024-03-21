/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fadeInOutAnimation } from '~/shared-module/animations/fade-in-out.animation';
import { ScheduleSubjectDetails } from '~/shared-module/models/schedule-subject-details.model';
import { ScheduleSubjectModalService } from '~/shared-module/service/schedule-subject-modal/schedule-subject-modal.service';
import { AbstractReactiveProvider } from '../abstract-reactive-provider';

@Component({
  selector: 'app-schedule-subject-modal',
  templateUrl: './schedule-subject-modal.component.html',
  styleUrl: './schedule-subject-modal.component.scss',
  animations: [fadeInOutAnimation],
})
export class ScheduleSubjectModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() isEditable = false;
  @Output() deleteScheduleSubject = new EventEmitter<number>();

  subjectDetails: ScheduleSubjectDetails | undefined = undefined;

  isEditableSectionVisible$ =
    this._scheduleSubjectModalService.isEditableSectionVisible$;

  constructor(
    private readonly _scheduleSubjectModalService: ScheduleSubjectModalService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._scheduleSubjectModalService.fetchSubjectDetails$()
    ).subscribe(subjectDetails => (this.subjectDetails = subjectDetails));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleCloseModal(): void {
    this._scheduleSubjectModalService.setIsOpen(false);
  }
}
