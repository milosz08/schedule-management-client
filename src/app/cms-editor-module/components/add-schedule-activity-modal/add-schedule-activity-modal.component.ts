/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScheduleAccData } from '~/cms-editor-module/models/schedule-convert.model';
import { ScheduleActivityHttpClientService } from '~/cms-editor-module/services/schedule-activity-http-client/schedule-activity-http-client.service';
import { ScheduleActivityService } from '~/cms-editor-module/services/schedule-activity/schedule-activity.service';
import { fadeInOutAnimation } from '~/shared-module/animations/fade-in-out.animation';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { ScheduleHttpClientService } from '~/shared-module/service/schedule-http-client/schedule-http-client.service';
import { SuspenseLoaderService } from '~/shared-module/service/suspense-loader/suspense-loader.service';
import { NameWithId } from '~/shared-module/types/drop-lists-data.type';

@Component({
  selector: 'app-add-schedule-activity-modal',
  templateUrl: './add-schedule-activity-modal.component.html',
  styleUrl: './add-schedule-activity-modal.component.scss',
  animations: [fadeInOutAnimation],
})
export class AddScheduleActivityModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  newActivityForm: FormGroup;
  addedForAllGroups = false;
  scheduleAccData?: ScheduleAccData;

  scheduleSubjects: string[] = [];
  scheduleSubjectTypes: string[] = [];
  studyYears: string[] = [];

  studyRooms: NameWithId[] = [];
  studyTeachers: NameWithId[] = [];
  studyWeeks: NameWithId[] = [];

  isOpen$ = this._scheduleActivityService.isOpen$;
  selectedDay$ = this._scheduleActivityService.selectedDay$;
  isLoading$ = this._scheduleActivityService.isLoading$;

  constructor(
    private readonly _scheduleActivityService: ScheduleActivityService,
    private readonly _scheduleActivityHttpClientService: ScheduleActivityHttpClientService,
    private readonly _scheduleHttpClientService: ScheduleHttpClientService,
    private readonly _suspenseLoaderService: SuspenseLoaderService
  ) {
    super();
    this.newActivityForm = new FormGroup({
      subjectOrActivityName: new FormControl('', [Validators.required]),
      subjectTypeName: new FormControl('', [Validators.required]),
      subjectRooms: new FormControl([]),
      subjectTeachers: new FormControl([]),
      hourStart: new FormControl('', [Validators.required]),
      hourEnd: new FormControl('', [Validators.required]),
      studyYear: new FormControl('', [Validators.required]),
      weeksData: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._scheduleHttpClientService.getScheduleYears$()
    ).subscribe(studyYears => (this.studyYears = studyYears));
    this.wrapAsObservable$(
      this._scheduleActivityService.selectedSchedule$
    ).subscribe(scheduleAccData => {
      this.scheduleAccData = scheduleAccData;
      if (scheduleAccData) {
        this.handleEmitSubjectBaseName();
        this.handleEmitSubjectTypeBaseName();
        this.handleFetchStudyRoomsBaseDepartment();
        if (this.getFormControlValue('subjectOrActivityName')) {
          this.handleFetchTeachersBaseDepartmentAndSubject();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitNewScheduleActivity(): void {
    this.wrapAsObservable$(
      this._scheduleActivityService.publishScheduleActivity$(
        this.newActivityForm.getRawValue()
      )
    ).subscribe({
      next: async () =>
        await this._suspenseLoaderService.reloadAngularPageWithRouter(),
    });
  }

  handleCloseModal(): void {
    this._scheduleActivityService.setIsOpen(false);
    this.newActivityForm.reset({
      subjectRooms: [],
      subjectTeachers: [],
      weeksData: [],
    });
  }

  handleEmitSubjectBaseName(subjectName?: string): void {
    this.wrapAsObservable$(
      this._scheduleActivityHttpClientService.getSubjectsBaseDepartmentAndSpecialization$(
        subjectName || '',
        this.scheduleAccData!.deptId,
        this.scheduleAccData!.specId
      )
    ).subscribe(({ dataElements }) => (this.scheduleSubjects = dataElements));
  }

  handleFetchStudyWeeksBaseYear(): void {
    const [startYear, endYear] = this.getFormControlValue('studyYear')
      .split('/')
      .map(year => Number(year));
    this.wrapAsObservable$(
      this._scheduleHttpClientService.getWeeksBaseYear$(startYear, endYear)
    ).subscribe(
      studyWeeks =>
        (this.studyWeeks = studyWeeks.map(week => ({ id: week, name: week })))
    );
  }

  handleEmitSubjectTypeBaseName(subjectTypeName?: string): void {
    this.wrapAsObservable$(
      this._scheduleActivityHttpClientService.getScheduleSubjectTypes$(
        subjectTypeName || ''
      )
    ).subscribe(
      ({ dataElements }) => (this.scheduleSubjectTypes = dataElements)
    );
  }

  handleFetchTeachersBaseDepartmentAndSubject(): void {
    this.wrapAsObservable$(
      this._scheduleActivityHttpClientService.getTeachersBaseDeptAndSubject$(
        this.scheduleAccData!.deptId,
        this.getFormControlValue('subjectOrActivityName')
      )
    ).subscribe(studyTeachers => {
      this.newActivityForm?.get('subjectTeachers')?.patchValue([]);
      this.studyTeachers = studyTeachers;
    });
  }

  handleFetchStudyRoomsBaseDepartment(): void {
    this.wrapAsObservable$(
      this._scheduleActivityHttpClientService.getStudyRoomsBaseDepartment$(
        this.scheduleAccData!.deptId
      )
    ).subscribe(studyRooms => (this.studyRooms = studyRooms));
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.newActivityForm, controlName);
  }

  private getFormControlValue(controlId: string): string {
    return this.newActivityForm.get(controlId)?.value;
  }
}
