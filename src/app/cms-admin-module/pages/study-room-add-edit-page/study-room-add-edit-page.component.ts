/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUpdateStudyRoomResponse } from '~/cms-admin-module/models/study-room.model';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { StudyRoomHttpClientService } from '~/cms-admin-module/services/study-room-http-client/study-room-http-client.service';
import { AbstractAddEditContentProvider } from '../abstract-add-edit-content-provider';

@Component({
  selector: 'app-study-room-add-edit-page',
  templateUrl: './study-room-add-edit-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [AddEditContentService],
})
export class StudyRoomAddEditPageComponent
  extends AbstractAddEditContentProvider
  implements OnInit, OnDestroy
{
  addEditStudyRoomForm: FormGroup;
  addEditStudyRoomRes?: AddUpdateStudyRoomResponse;

  roomTypes: string[] = [];

  loadingEditableContent$ = this._addEditContentService.loadingEditableContent$;
  isLoading$ = this._addEditContentService.isLoading$;

  constructor(
    private readonly _addEditContentService: AddEditContentService,
    private readonly _studyRoomHttpClientServie: StudyRoomHttpClientService
  ) {
    super(_addEditContentService);
    this.addEditStudyRoomForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.max(150)]),
      departmentName: new FormControl('', [Validators.required]),
      cathedralName: new FormControl('', [Validators.required]),
      capacity: new FormControl(5, [Validators.required, Validators.min(5)]),
      roomTypeName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._studyRoomHttpClientServie.getRoomTypes$()
    ).subscribe(({ dataElements }) => (this.roomTypes = dataElements));
    this.wrapAsObservable$(
      this._addEditContentService.setEditElementFormContent$(
        this.addEditStudyRoomForm,
        this.currentMode,
        this._studyRoomHttpClientServie.getStudyRoomDetails$.bind(
          this._studyRoomHttpClientServie
        ),
        ['departmentName', 'cathedralName']
      )
    ).subscribe(
      this._addEditContentService.navigateOnErrorCallback('study-rooms')
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitAddEditStudyRoom(): void {
    this.wrapAsObservable$(
      this._addEditContentService.addUpdateContent$(
        this.currentMode,
        this.addEditStudyRoomForm.getRawValue(),
        this._studyRoomHttpClientServie,
        this._studyRoomHttpClientServie.createNewStudyRoom$,
        this._studyRoomHttpClientServie.updateStudyRoom$
      )
    ).subscribe(addEditStudyRoomRes => {
      if (this.currentMode === 'add') {
        this.addEditStudyRoomForm.reset();
      }
      this.addEditStudyRoomRes = addEditStudyRoomRes;
    });
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.addEditStudyRoomForm, controlName);
  }
}
