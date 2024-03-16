/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUpdateStudySpecializationResponse } from '~/cms-admin-module/models/study-spec.model';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { StudySpecializationHttpClientService } from '~/cms-admin-module/services/study-specialization-http-client/study-specialization-http-client.service';
import { AbstractAddEditContentProvider } from '../abstract-add-edit-content-provider';

@Component({
  selector: 'app-study-specialization-add-edit-page',
  templateUrl: './study-specialization-add-edit-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [AddEditContentService],
})
export class StudySpecializationAddEditPageComponent
  extends AbstractAddEditContentProvider
  implements OnInit, OnDestroy
{
  addEditStudySpecForm: FormGroup;
  addEditStudySpecsRes: AddUpdateStudySpecializationResponse[] = [];

  loadingEditableContent$ = this._addEditContentService.loadingEditableContent$;
  isLoading$ = this._addEditContentService.isLoading$;

  constructor(
    private readonly _addEditContentService: AddEditContentService,
    private readonly _studySpecializationHttpClientService: StudySpecializationHttpClientService
  ) {
    super(_addEditContentService);
    this.addEditStudySpecForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      alias: new FormControl('', [Validators.required]),
      departmentName: new FormControl('', [Validators.required]),
      studyType: new FormControl([], [Validators.required]),
      studyDegree: new FormControl([], [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._addEditContentService.setEditElementFormContent$(
        this.addEditStudySpecForm,
        this.currentMode,
        this._studySpecializationHttpClientService.getStudySpecializationDetails$.bind(
          this._studySpecializationHttpClientService
        ),
        ['departmentName']
      )
    ).subscribe(
      this._addEditContentService.navigateOnErrorCallback(
        'study-specializations'
      )
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.addEditStudySpecForm, controlName);
  }
}
