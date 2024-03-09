/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentData } from '~/cms-admin-module/models/entities.model';
import { DepartmentHttpClientService } from '~/cms-admin-module/services/department-http-client/department-http-client.service';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [PaginationService, DeleteContentService],
})
export class DepartmentsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  departments: DepartmentData[] = [];

  constructor(
    private readonly _paginationService: PaginationService,
    private readonly _deleteContentService: DeleteContentService,
    private readonly _departmentHttpClientService: DepartmentHttpClientService
  ) {
    super();
    this._deleteContentService.setDeleteEndpoint('department');
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._paginationService.withListenPaginatorValues$(
        this._departmentHttpClientService.getDepartments$.bind(
          this._departmentHttpClientService
        )
      )
    ).subscribe(departments => (this.departments = departments));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
