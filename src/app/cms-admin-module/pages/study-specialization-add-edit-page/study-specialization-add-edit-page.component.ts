import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUpdateStudySpecializationResponse } from '~/cms-admin-module/models/study-spec.model';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { DepartmentHttpClientService } from '~/cms-admin-module/services/department-http-client/department-http-client.service';
import { StudySpecializationHttpClientService } from '~/cms-admin-module/services/study-specialization-http-client/study-specialization-http-client.service';
import { NameWithId } from '~/shared-module/types/drop-lists-data.type';
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

  studyTypes: NameWithId[] = [];
  studyDegress: NameWithId[] = [];
  departments: string[] = [];

  loadingEditableContent$ = this._addEditContentService.loadingEditableContent$;
  isLoading$ = this._addEditContentService.isLoading$;

  constructor(
    private readonly _addEditContentService: AddEditContentService,
    private readonly _studySpecializationHttpClientService: StudySpecializationHttpClientService,
    private readonly _departmentHttpClientService: DepartmentHttpClientService
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
    this.handleEmitDepartmentName();
    this.wrapAsObservable$(
      this._studySpecializationHttpClientService.getStudyTypes$()
    ).subscribe(({ dataElements }) => (this.studyTypes = dataElements));
    this.wrapAsObservable$(
      this._studySpecializationHttpClientService.getStudyDegrees$()
    ).subscribe(({ dataElements }) => (this.studyDegress = dataElements));
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

  handleSubmitStudySpec(): void {
    this.wrapAsObservable$(
      this._addEditContentService.addUpdateContent$(
        this.currentMode,
        this.addEditStudySpecForm.getRawValue(),
        this._studySpecializationHttpClientService,
        this._studySpecializationHttpClientService
          .createNewStudySpecialization$,
        this._studySpecializationHttpClientService.updateStudySpecialization$
      )
    ).subscribe(addEditStudySpecsRes => {
      if (this.currentMode === 'add') {
        this.addEditStudySpecForm.reset({ studyType: [], studyDegree: [] });
      }
      this.addEditStudySpecsRes = addEditStudySpecsRes;
    });
  }

  handleEmitDepartmentName(departmentName?: string): void {
    this.wrapAsObservable$(
      this._departmentHttpClientService.getDepartmentsByName$(
        departmentName || ''
      )
    ).subscribe(({ dataElements }) => (this.departments = dataElements));
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.addEditStudySpecForm, controlName);
  }
}
