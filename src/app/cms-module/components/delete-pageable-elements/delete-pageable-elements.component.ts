/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationData } from '~/cms-module/models/pagination.model';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-delete-pageable-elements',
  templateUrl: './delete-pageable-elements.component.html',
  host: { class: 'app__cms-full-size' },
})
export class DeletePageableElementsComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  paginationData?: PaginationData;

  isDeleteContentEmpty$ = this._deleteContentService.isDeleteContentEmpty$;
  fetchingStatus$ = this._paginationService.fetchingStatus$;

  constructor(
    private readonly _paginationService: PaginationService,
    private readonly _deleteContentService: DeleteContentService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(this._paginationService.paginationData$).subscribe(
      paginationData => (this.paginationData = paginationData)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleOpenDeleteModal(): void {
    this._deleteContentService.setIsOpen(true);
  }

  handleRefetchData(): void {
    this._paginationService.invokeRefetchData();
  }
}
