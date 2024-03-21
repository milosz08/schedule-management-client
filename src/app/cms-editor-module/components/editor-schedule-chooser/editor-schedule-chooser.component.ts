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
import { IdentityService } from '~/shared-module/service/identity/identity.service';

@Component({
  selector: 'app-editor-schedule-chooser',
  templateUrl: './editor-schedule-chooser.component.html',
})
export class EditorScheduleChooserComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  editorSelectScheduleForm: FormGroup;
  loggedUserDepartment = '';

  scheduleGroups: string[] = [];
  studySpecs: string[] = [];

  groupFieldVisibility$ = this._scheduleSelectorService.groupFieldVisibility$;
  isSelecting$ = this._scheduleActivityService.isSelecting$;

  constructor(
    private readonly _scheduleSelectorService: ScheduleSelectorService,
    private readonly _scheduleActivityService: ScheduleActivityService,
    private readonly _scheduleSelectorHttpClientService: ScheduleSelectorHttpClientService,
    private readonly _identityService: IdentityService
  ) {
    super();
    this.editorSelectScheduleForm = new FormGroup({
      studySpecName: new FormControl('', [Validators.required]),
      studyGroupName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._scheduleSelectorService.setStudyGroupsQueryCallback(
      this,
      this.handleEmitScheduleGroupName
    );
    this.wrapAsObservable$(
      this._identityService.loggedUserDepartment$
    ).subscribe(loggedUserDepartment => {
      this.loggedUserDepartment = loggedUserDepartment;
      this.handleEmitScheduleGroupName();
      this.handleEmitStudyTypeName();
    });
    this.wrapAsObservable$(
      this._scheduleSelectorService.listenStudySpecFormChanges$(
        this.editorSelectScheduleForm
      )
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleShowScheduleGroups(): void {
    this._scheduleSelectorService.showScheduleGroups();
  }

  handleSubmitSelectScheduleGroup(): void {
    this.wrapAsObservable$(
      this._scheduleActivityService.setSelectedSchedule$({
        ...this.editorSelectScheduleForm.getRawValue(),
        departmentName: this.loggedUserDepartment,
      })
    ).subscribe(this._scheduleActivityService.navigateToScheduleActivity());
  }

  handleEmitStudyTypeName(studySpecName?: string): void {
    this.wrapAsObservable$(
      this._scheduleSelectorHttpClientService.getSpecializationsBaseDeptAndSpec$(
        studySpecName || '',
        this.loggedUserDepartment
      )
    ).subscribe(({ dataElements }) => (this.studySpecs = dataElements));
  }

  handleEmitScheduleGroupName(studyGroupName?: string): void {
    this.wrapAsObservable$(
      this._scheduleSelectorHttpClientService.getGroupsBaseDeptAndSpec$(
        studyGroupName || '',
        this.loggedUserDepartment,
        this.editorSelectScheduleForm.get('studySpecName')?.value
      )
    ).subscribe(({ dataElements }) => (this.scheduleGroups = dataElements));
  }
}
