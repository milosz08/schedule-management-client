/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScheduleActivityService } from '~/cms-editor-module/services/schedule-activity/schedule-activity.service';
import { ScheduleSelectorHttpClientService } from '~/cms-editor-module/services/schedule-selector-http-client/schedule-selector-http-client.service';
import { ScheduleSelectorService } from '~/cms-editor-module/services/schedule-selector/schedule-selector.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-admin-schedule-chooser',
  templateUrl: './admin-schedule-chooser.component.html',
})
export class AdminScheduleChooserComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  adminSelectScheduleForm: FormGroup;

  scheduleGroups: string[] = [];
  departments: string[] = [];
  studySpecs: string[] = [];

  isSelecting$ = this._scheduleActivityService.isSelecting$;
  groupFieldVisibility$ = this._scheduleSelectorService.groupFieldVisibility$;
  studySpecVisibility$ = this._scheduleSelectorService.studySpecVisibility$;

  constructor(
    private readonly _scheduleSelectorService: ScheduleSelectorService,
    private readonly _scheduleActivityService: ScheduleActivityService,
    private readonly _scheduleSelectorHttpClientService: ScheduleSelectorHttpClientService
  ) {
    super();
    this.adminSelectScheduleForm = new FormGroup({
      departmentName: new FormControl('', [Validators.required]),
      studySpecName: new FormControl('', [Validators.required]),
      studyGroupName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.handleEmitDepartmentName();
    this.handleEmitStudySpecName();
    this.handleEmitScheduleGroupName();
    this.handleEmitScheduleGroupName();
    this._scheduleSelectorService.setStudyGroupsQueryCallback(
      this,
      this.handleEmitScheduleGroupName
    );
    this._scheduleSelectorService.setStudySpecsQueryCallback(
      this,
      this.handleEmitStudySpecName
    );
    this.wrapAsObservable$(
      this._scheduleSelectorService.listenStudyGroupFormChanges$(
        this.adminSelectScheduleForm
      )
    ).subscribe();
    this.wrapAsObservable$(
      this._scheduleSelectorService.listenStudySpecFormChanges$(
        this.adminSelectScheduleForm
      )
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleShowStudySpecs(): void {
    this._scheduleSelectorService.showStudySpecs();
  }

  handleShowScheduleGroups(): void {
    this._scheduleSelectorService.showScheduleGroups();
  }

  handleSubmitSelectScheduleGroup(): void {
    this.wrapAsObservable$(
      this._scheduleActivityService.setSelectedSchedule$(
        this.adminSelectScheduleForm.getRawValue()
      )
    ).subscribe(this._scheduleActivityService.navigateToScheduleActivity());
  }

  handleEmitDepartmentName(departmentName?: string): void {
    this.wrapAsObservable$(
      this._scheduleSelectorHttpClientService.getDepartmentsByName$(
        departmentName || ''
      )
    ).subscribe(({ dataElements }) => (this.departments = dataElements));
  }

  handleEmitStudySpecName(studySpecName?: string): void {
    this.wrapAsObservable$(
      this._scheduleSelectorHttpClientService.getStudySpecializationsBaseDepartment$(
        studySpecName || '',
        this.adminSelectScheduleForm?.get('departmentName')?.value || ''
      )
    ).subscribe(({ dataElements }) => (this.studySpecs = dataElements));
  }

  handleEmitScheduleGroupName(studyGroupName?: string): void {
    this.wrapAsObservable$(
      this._scheduleSelectorHttpClientService.getGroupsBaseDeptAndSpec$(
        studyGroupName || '',
        this.adminSelectScheduleForm.get('departmentName')?.value,
        this.adminSelectScheduleForm.get('studySpecName')?.value
      )
    ).subscribe(({ dataElements }) => (this.scheduleGroups = dataElements));
  }
}
