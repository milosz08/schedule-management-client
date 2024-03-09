/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { CurrentActivePages } from '~/cms-module/models/pagination.model';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-pagination-options',
  templateUrl: './pagination-options.component.html',
  styleUrl: './pagination-options.component.scss',
})
export class PaginationOptionsComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  activePages?: CurrentActivePages;
  totalPages = 0;

  currentPage$ = this._paginationService.currentPage$;
  currentSize$ = this._paginationService.currentSize$;
  allPageSizes$ = this._paginationService.allPageSizes$;

  constructor(private readonly _paginationService: PaginationService) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      combineLatest([
        this._paginationService.activePages$,
        this._paginationService.totalPages$,
      ])
    ).subscribe(([activePages, totalPages]) => {
      this.activePages = activePages;
      this.totalPages = totalPages;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handlePrevPage(): void {
    this._paginationService.setPrevPage();
  }

  handleSelectPage(page: number): void {
    this._paginationService.selectPage(page);
  }

  handleNextPage(): void {
    this._paginationService.setNextPage();
  }

  handleChangePaginationSize(size: number): void {
    this._paginationService.updatePageSize(size);
  }
}
