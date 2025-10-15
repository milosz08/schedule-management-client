import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CathedralHttpClientService } from '~/cms-admin-module/services/cathedral-http-client/cathedral-http-client.service';
import { DepartmentHttpClientService } from '~/cms-admin-module/services/department-http-client/department-http-client.service';
import { ContentMode } from '~/cms-admin-module/types/content-mode.type';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-dept-with-cath',
  templateUrl: './dept-with-cath.component.html',
})
export class DeptWithCathComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() labelId = '';
  @Input() formGroup?: FormGroup;
  @Input() currentMode: ContentMode = 'add';

  @Output() emitNextSelection = new EventEmitter<void>();

  cathedralsVisibility = false;
  departments: string[] = [];
  cathedrals: string[] = [];

  constructor(
    private readonly _departmentHttpClientService: DepartmentHttpClientService,
    private readonly _cathedralHttpClientService: CathedralHttpClientService
  ) {
    super();
  }

  ngOnInit(): void {
    this.handleEmitDepartmentName();
    this.handleEmitCathedralName();
    const changesObserver$ =
      this.formGroup?.get('departmentName')?.valueChanges;
    if (changesObserver$) {
      this.wrapAsObservable$(changesObserver$).subscribe(() => {
        this.handleEmitCathedralName();
        this.cathedralsVisibility = this.currentMode === 'edit';
        if (this.currentMode === 'add') {
          this.formGroup?.get('cathedralName')?.patchValue('');
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

  handleEmitCathedralName(cathedralName?: string): void {
    this.wrapAsObservable$(
      this._cathedralHttpClientService.getCathedralsBaseDepartment$(
        cathedralName || '',
        this.formGroup?.get('departmentName')?.value || ''
      )
    ).subscribe(({ dataElements }) => (this.cathedrals = dataElements));
  }
}
