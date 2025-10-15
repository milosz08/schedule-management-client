import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUpdateStudyGroupResponse } from '~/cms-admin-module/models/study-group.model';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { StudyGroupHttpClientService } from '~/cms-admin-module/services/study-group-http-client/study-group-http-client.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { NameWithId } from '~/shared-module/types/drop-lists-data.type';

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
  semesters: NameWithId[] = [];

  isLoading$ = this._addEditContentService.isLoading$;

  constructor(
    private readonly _addEditContentService: AddEditContentService,
    private readonly _studyGroupHttpClientService: StudyGroupHttpClientService
  ) {
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
    this.wrapAsObservable$(
      this._studyGroupHttpClientService.getSemesters$()
    ).subscribe(({ dataElements }) => (this.semesters = dataElements));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitAddStudyGroup(): void {
    this.wrapAsObservable$(
      this._addEditContentService.addUpdateContent$(
        'add',
        this.addStudyGroupForm.getRawValue(),
        this._studyGroupHttpClientService,
        this._studyGroupHttpClientService.createNewStudyGroup$
      )
    ).subscribe(addStudyGroupsRes => {
      this.addStudyGroupForm.reset({ semesters: [], countOfGroups: 1 });
      this.addStudyGroupsRes = addStudyGroupsRes;
    });
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.addStudyGroupForm, controlName);
  }
}
