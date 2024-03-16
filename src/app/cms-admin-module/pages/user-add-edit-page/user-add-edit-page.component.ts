/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUpdateUserResponse } from '~/cms-admin-module/models/user.model';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { DepartmentHttpClientService } from '~/cms-admin-module/services/department-http-client/department-http-client.service';
import { StudySpecializationHttpClientService } from '~/cms-admin-module/services/study-specialization-http-client/study-specialization-http-client.service';
import { StudySubjectHttpClientService } from '~/cms-admin-module/services/study-subject-http-client/study-subject-http-client.service';
import { UserHttpClientService } from '~/cms-admin-module/services/user-http-client/user-http-client.service';
import { FileHelperService } from '~/shared-module/service/file-helper/file-helper.service';
import { NameWithId } from '~/shared-module/types/drop-lists-data.type';
import { UserIdentityType } from '~/shared-module/types/user-identity.type';
import { AbstractAddEditContentProvider } from '../abstract-add-edit-content-provider';

@Component({
  selector: 'app-user-add-edit-page',
  templateUrl: './user-add-edit-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [AddEditContentService],
})
export class UserAddEditPageComponent
  extends AbstractAddEditContentProvider
  implements OnInit, OnDestroy
{
  addEditUserForm: FormGroup;
  addEditUserRes?: AddUpdateUserResponse;

  roles: string[] = [];
  departments: string[] = [];
  subjects: NameWithId[] = [];
  studySpecs: NameWithId[] = [];
  currentRole: UserIdentityType = UserIdentityType.UNDEFINED;

  regeneratePassword = false;
  studySpecsVisibility = false;
  studySubjectsVisibility = false;

  loadingEditableContent$ = this._addEditContentService.loadingEditableContent$;
  isLoading$ = this._addEditContentService.isLoading$;

  constructor(
    private readonly _addEditContentService: AddEditContentService,
    private readonly _userHttpClientService: UserHttpClientService,
    private readonly _fileHelperService: FileHelperService,
    private readonly _departmentHttpClientService: DepartmentHttpClientService,
    private readonly _studySpecializationHttpClientService: StudySpecializationHttpClientService,
    private readonly _studySubjectHttpClientService: StudySubjectHttpClientService
  ) {
    super(_addEditContentService);
    this.addEditUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      departmentName: new FormControl('', [Validators.required]),
      cathedralName: new FormControl(''),
      studySpecsOrSubjects: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.handleEmitDepartmentName();
    this.wrapAsObservable$(
      this._userHttpClientService.getUserRoles$()
    ).subscribe(({ dataElements }) => (this.roles = dataElements));
    this.listenFormElement('role', role => {
      this.currentRole = role as UserIdentityType;
      this.studySpecsVisibility = false;
      this.studySubjectsVisibility = false;
      this.getFormElement('departmentName')?.patchValue('');
    });
    this.listenFormElement('departmentName', () => {
      this.getFormElement('studySpecsOrSubjects')?.patchValue([]);
      if (this.currentMode === 'edit' && this.getFormValue('departmentName')) {
        switch (this.currentRole) {
          case UserIdentityType.STUDENT:
            this.handleEmitStudySpecializations();
            break;
          case UserIdentityType.TEACHER:
          case UserIdentityType.EDITOR:
            this.handleEmitStudySubjects();
        }
      }
    });
    this.wrapAsObservable$(
      this._addEditContentService.setEditElementFormContent$(
        this.addEditUserForm,
        this.currentMode,
        this._userHttpClientService.getUserDetails$.bind(
          this._userHttpClientService
        ),
        ['name', 'surname']
      )
    ).subscribe(this._addEditContentService.navigateOnErrorCallback('users'));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleEmitDepartmentName(departmentName?: string): void {
    this.wrapAsObservable$(
      this._departmentHttpClientService.getDepartmentsByName$(
        departmentName || ''
      )
    ).subscribe(({ dataElements }) => (this.departments = dataElements));
  }

  handleEmitStudySpecializations(): void {
    this.studySpecsVisibility = true;
    this.wrapAsObservable$(
      this._studySpecializationHttpClientService.getAllStudySpecializationsBaseDepartment$(
        this.getFormValue('departmentName')
      )
    ).subscribe(({ dataElements }) => (this.studySpecs = dataElements));
  }

  handleEmitStudySubjects(): void {
    this.studySubjectsVisibility = true;
    this.wrapAsObservable$(
      this._studySubjectHttpClientService.getAllStudySubjectsBaseDepartments$(
        this.getFormValue('departmentName')
      )
    ).subscribe(({ dataElements }) => (this.subjects = dataElements));
  }

  handleSubmitAddEditUser(): void {
    this.wrapAsObservable$(
      this._addEditContentService.addUpdateContent$(
        this.currentMode,
        this.addEditUserForm.getRawValue(),
        this._userHttpClientService,
        this._userHttpClientService.createNewUser$,
        (id, req) =>
          this._userHttpClientService.updateUser$(
            id,
            this.regeneratePassword,
            req
          )
      )
    ).subscribe(addEditUserRes => {
      if (this.currentMode === 'add') {
        this.addEditUserForm.reset({ studySpecsOrSubjects: [] });
      }
      this.addEditUserRes = addEditUserRes;
    });
  }

  handleSaveUserToFile(): void {
    if (this.addEditUserRes) {
      const { name, surname } = this.addEditUserRes;
      const date = new Date();
      const fileName = `user_${name}-${surname}__${date.toISOString().split('T')[0]}.txt`;
      const textData =
        `Imię i nazwisko: ${name} ${surname}\n` +
        `Miejscowość zamieszkania: ${this.addEditUserRes.city}\n` +
        `Narodowość: ${this.addEditUserRes.nationality}\n` +
        `Rola w systemie: ${this.addEditUserRes.role}\n` +
        `Adres email: ${this.addEditUserRes.email}\n` +
        `Hasło do adresu email: ${this.addEditUserRes.emailPassword}\n`;
      this._fileHelperService.saveTextToFile(textData, fileName.toLowerCase());
    }
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.addEditUserForm, controlName);
  }

  getFormValue(controlId: string): string {
    return this.getFormElement(controlId)?.value;
  }

  getFormElement(controlId: string) {
    return this.addEditUserForm?.get(controlId);
  }

  listenFormElement(controlId: string, callback: (value: string) => void) {
    const observable$ = this.addEditUserForm?.get(controlId)?.valueChanges;
    if (observable$) {
      this.wrapAsObservable$(observable$).subscribe(value => callback(value));
    }
  }
}
