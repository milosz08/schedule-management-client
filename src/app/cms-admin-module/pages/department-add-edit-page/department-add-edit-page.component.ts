/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUpdateDepartment } from '~/cms-admin-module/models/department.model';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { DepartmentHttpClientService } from '~/cms-admin-module/services/department-http-client/department-http-client.service';
import { AbstractAddEditContentProvider } from '../abstract-add-edit-content-provider';

@Component({
  selector: 'app-department-add-edit-page',
  templateUrl: './department-add-edit-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [AddEditContentService],
})
export class DepartmentAddEditPageComponent
  extends AbstractAddEditContentProvider
  implements OnInit, OnDestroy
{
  addEditDepartmentForm: FormGroup;
  addEditDepartmentRes?: AddUpdateDepartment;

  loadingEditableContent$ = this._addEditContentService.loadingEditableContent$;
  isLoading$ = this._addEditContentService.isLoading$;

  constructor(
    private readonly _addEditContentService: AddEditContentService,
    private readonly _departmentHttpClientService: DepartmentHttpClientService
  ) {
    super(_addEditContentService);
    this.addEditDepartmentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      alias: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._addEditContentService.setEditElementFormContent$(
        this.addEditDepartmentForm,
        this.currentMode,
        this._departmentHttpClientService.getDepartmentDetails$.bind(
          this._departmentHttpClientService
        )
      )
    ).subscribe(
      this._addEditContentService.navigateOnErrorCallback('departments')
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitAddEditDepartment(): void {
    console.log('submit');
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.addEditDepartmentForm, controlName);
  }
}
