/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUpdateStudySubjectResponse } from '~/cms-admin-module/models/study-subject.model';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { StudySubjectHttpClientService } from '~/cms-admin-module/services/study-subject-http-client/study-subject-http-client.service';
import { AbstractAddEditContentProvider } from '../abstract-add-edit-content-provider';

@Component({
  selector: 'app-study-subject-add-edit-page',
  templateUrl: './study-subject-add-edit-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [AddEditContentService],
})
export class StudySubjectAddEditPageComponent
  extends AbstractAddEditContentProvider
  implements OnInit, OnDestroy
{
  addEditStudySubjectForm: FormGroup;
  addEditStudySubjectRes?: AddUpdateStudySubjectResponse;

  loadingEditableContent$ = this._addEditContentService.loadingEditableContent$;
  isLoading$ = this._addEditContentService.isLoading$;

  constructor(
    private readonly _addEditContentService: AddEditContentService,
    private readonly _studySubjectHttpClientService: StudySubjectHttpClientService
  ) {
    super(_addEditContentService);
    this.addEditStudySubjectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      departmentName: new FormControl('', [Validators.required]),
      studySpecName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._addEditContentService.setEditElementFormContent$(
        this.addEditStudySubjectForm,
        this.currentMode,
        this._studySubjectHttpClientService.getStudySubjectDetails$.bind(
          this._studySubjectHttpClientService
        ),
        ['departmentName', 'studySpecName']
      )
    ).subscribe(
      this._addEditContentService.navigateOnErrorCallback('study-subjects')
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitAddEditStudySubject(): void {
    this.wrapAsObservable$(
      this._addEditContentService.addUpdateContent$(
        this.currentMode,
        this.addEditStudySubjectForm.getRawValue(),
        this._studySubjectHttpClientService,
        this._studySubjectHttpClientService.createNewStudySubject$,
        this._studySubjectHttpClientService.updateStudySubject$
      )
    ).subscribe(addEditStudySubjectRes => {
      if (this.currentMode === 'add') {
        this.addEditStudySubjectForm.reset();
      }
      this.addEditStudySubjectRes = addEditStudySubjectRes;
    });
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.addEditStudySubjectForm, controlName);
  }
}
