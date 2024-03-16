/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUpdateUserResponse } from '~/cms-admin-module/models/user.model';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { UserHttpClientService } from '~/cms-admin-module/services/user-http-client/user-http-client.service';
import { FileHelperService } from '~/shared-module/service/file-helper/file-helper.service';
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

  loadingEditableContent$ = this._addEditContentService.loadingEditableContent$;
  isLoading$ = this._addEditContentService.isLoading$;

  constructor(
    private readonly _addEditContentService: AddEditContentService,
    private readonly _userHttpClientService: UserHttpClientService,
    private readonly _fileHelperService: FileHelperService
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
}
