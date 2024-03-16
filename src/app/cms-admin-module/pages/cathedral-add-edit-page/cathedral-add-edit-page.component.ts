/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUpdateCathedralResponse } from '~/cms-admin-module/models/cathedral.model';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { CathedralHttpClientService } from '~/cms-admin-module/services/cathedral-http-client/cathedral-http-client.service';
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

  loadingEditableContent$ = this._addEditContentService.loadingEditableContent$;
  isLoading$ = this._addEditContentService.isLoading$;

  constructor(
    private readonly _addEditContentService: AddEditContentService,
    private readonly _cathedralHttpClientService: CathedralHttpClientService
  ) {
    super(_addEditContentService);
    this.addEditCathedralForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      alias: new FormControl('', [Validators.required]),
      departmentName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
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

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.addEditCathedralForm, controlName);
  }
}
