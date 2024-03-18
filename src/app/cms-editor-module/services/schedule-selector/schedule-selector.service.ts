/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, OperatorFunction, map, of } from 'rxjs';
import { AbstractLoadingProvider } from '~/shared-module/service/abstract-loading-provider';

@Injectable()
export class ScheduleSelectorService extends AbstractLoadingProvider {
  private _groupFieldVisibility$ = new BehaviorSubject<boolean>(false);
  private _studySpecVisibility$ = new BehaviorSubject<boolean>(false);

  private _studyGroupsQueryCallback?: (studyGroupName?: string) => void;
  private _studySpecsQueryCallback?: (studySpecName?: string) => void;

  listenStudyGroupFormChanges$(formGroup: FormGroup): Observable<null> {
    return this.listenEditorFormChanges$(
      formGroup,
      'departmentName',
      map(() => {
        formGroup.get('studySpecName')?.patchValue('');
        formGroup.get('studyGroupName')?.patchValue('');
        this._studySpecVisibility$.next(false);
        this._groupFieldVisibility$.next(false);
        return null;
      })
    );
  }

  listenStudySpecFormChanges$(formGroup: FormGroup): Observable<null> {
    return this.listenEditorFormChanges$(
      formGroup,
      'studySpecName',
      map(() => {
        formGroup.get('studyGroupName')?.patchValue('');
        this._groupFieldVisibility$.next(false);
        return null;
      })
    );
  }

  private listenEditorFormChanges$(
    formGroup: FormGroup,
    controlId: string,
    callback$: OperatorFunction<unknown, null>
  ): Observable<null> {
    const studySpecName = formGroup.get(controlId);
    if (!studySpecName) {
      return of(null);
    }
    return studySpecName.valueChanges.pipe(callback$);
  }

  setStudyGroupsQueryCallback(
    rootComponent: object,
    studyGroupsQueryCallback: (studySpecName?: string) => void
  ): void {
    this._studyGroupsQueryCallback =
      studyGroupsQueryCallback.bind(rootComponent);
  }

  setStudySpecsQueryCallback(
    rootComponent: object,
    studySpecsQueryCallback: (studyGroupName?: string) => void
  ): void {
    this._studySpecsQueryCallback = studySpecsQueryCallback.bind(rootComponent);
  }

  showScheduleGroups(): void {
    if (this._studyGroupsQueryCallback) {
      this._studyGroupsQueryCallback();
    }
    this._groupFieldVisibility$.next(true);
  }

  showStudySpecs(): void {
    if (this._studySpecsQueryCallback) {
      this._studySpecsQueryCallback();
    }
    this._studySpecVisibility$.next(true);
  }

  get groupFieldVisibility$(): Observable<boolean> {
    return this._groupFieldVisibility$.asObservable();
  }
  get studySpecVisibility$(): Observable<boolean> {
    return this._studySpecVisibility$.asObservable();
  }
}
