import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUpdateCathedralResponse } from '~/cms-admin-module/models/cathedral.model';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { CathedralHttpClientService } from '~/cms-admin-module/services/cathedral-http-client/cathedral-http-client.service';
import { DepartmentHttpClientService } from '~/cms-admin-module/services/department-http-client/department-http-client.service';
import { AbstractAddEditContentProvider } from '../abstract-add-edit-content-provider';

@Component({
  selector: 'app-cathedral-add-edit-page',
  templateUrl: './cathedral-add-edit-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [AddEditContentService],
})
export class CathedralAddEditPageComponent
  extends AbstractAddEditContentProvider
  implements OnInit, OnDestroy
{
  addEditCathedralForm: FormGroup;
  addEditCathedralRes?: AddUpdateCathedralResponse;
  departments: string[] = [];

  loadingEditableContent$ = this._addEditContentService.loadingEditableContent$;
  isLoading$ = this._addEditContentService.isLoading$;

  constructor(
    private readonly _addEditContentService: AddEditContentService,
    private readonly _cathedralHttpClientService: CathedralHttpClientService,
    private readonly _departmentHttpClientService: DepartmentHttpClientService
  ) {
    super(_addEditContentService);
    this.addEditCathedralForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      alias: new FormControl('', [Validators.required]),
      departmentName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.handleEmitDepartmentName();
    this.wrapAsObservable$(
      this._addEditContentService.setEditElementFormContent$(
        this.addEditCathedralForm,
        this.currentMode,
        this._cathedralHttpClientService.getCathedralDetails$.bind(
          this._cathedralHttpClientService
        ),
        ['departmentName']
      )
    ).subscribe(
      this._addEditContentService.navigateOnErrorCallback('cathedrals')
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitAddEditCathedral(): void {
    this.wrapAsObservable$(
      this._addEditContentService.addUpdateContent$(
        this.currentMode,
        this.addEditCathedralForm.getRawValue(),
        this._cathedralHttpClientService,
        this._cathedralHttpClientService.createNewCathedral$,
        this._cathedralHttpClientService.updateCathedral$
      )
    ).subscribe(addEditCathedralRes => {
      if (this.currentMode === 'add') {
        this.addEditCathedralForm.reset();
      }
      this.addEditCathedralRes = addEditCathedralRes;
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
    return this.checkFormFieldErrors(this.addEditCathedralForm, controlName);
  }
}
