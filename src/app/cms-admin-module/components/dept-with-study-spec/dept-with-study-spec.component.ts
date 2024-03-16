/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DepartmentHttpClientService } from '~/cms-admin-module/services/department-http-client/department-http-client.service';
import { StudySpecializationHttpClientService } from '~/cms-admin-module/services/study-specialization-http-client/study-specialization-http-client.service';
import { ContentMode } from '~/cms-admin-module/types/content-mode.type';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-dept-with-study-spec',
  templateUrl: './dept-with-study-spec.component.html',
})
export class DeptWithStudySpecComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() labelId = '';
  @Input() formGroup?: FormGroup;
  @Input() currentMode: ContentMode = 'add';

  @Output() emitNextSelection = new EventEmitter<void>();

  studySpecVisibily = false;
  departments: string[] = [];
  studySpecs: string[] = [];

  constructor(
    private readonly _departmentHttpClientService: DepartmentHttpClientService,
    private readonly _studySpecializationHttpClientService: StudySpecializationHttpClientService
  ) {
    super();
  }

  ngOnInit(): void {
    this.handleEmitDepartmentName();
    this.handleEmitStudySpecName();
    const changesObserver$ =
      this.formGroup?.get('departmentName')?.valueChanges;
    if (changesObserver$) {
      this.wrapAsObservable$(changesObserver$).subscribe(() => {
        this.handleEmitStudySpecName();
        this.studySpecVisibily = this.currentMode === 'edit';
        if (this.currentMode === 'add') {
          this.formGroup?.get('studySpecName')?.patchValue('');
        }
      });
    }
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

  handleEmitStudySpecName(studySpecName?: string): void {
    this.wrapAsObservable$(
      this._studySpecializationHttpClientService.getStudySpecializationsBaseDepartment$(
        studySpecName || '',
        this.formGroup?.get('departmentName')?.value || ''
      )
    ).subscribe(({ dataElements }) => (this.studySpecs = dataElements));
  }
}
