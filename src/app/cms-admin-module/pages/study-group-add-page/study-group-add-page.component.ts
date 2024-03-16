/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUpdateStudyGroupResponse } from '~/cms-admin-module/models/study-group.model';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-study-group-add-page',
  templateUrl: './study-group-add-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [AddEditContentService],
})
export class StudyGroupAddPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  addStudyGroupForm: FormGroup;
  addStudyGroupsRes: AddUpdateStudyGroupResponse[] = [];

  isLoading$ = this._addEditContentService.isLoading$;

  constructor(private readonly _addEditContentService: AddEditContentService) {
    super();
    this.addStudyGroupForm = new FormGroup({
      departmentName: new FormControl('', [Validators.required]),
      studySpecName: new FormControl('', [Validators.required]),
      semesters: new FormControl([], [Validators.required]),
      countOfGroups: new FormControl(1, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  ngOnInit(): void {
    console.log();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.addStudyGroupForm, controlName);
  }
}
