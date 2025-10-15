import { Component, Input } from '@angular/core';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { SortingBy } from '~/cms-module/types/sorting-by.type';

@Component({
  selector: 'app-sorting-button',
  templateUrl: './sorting-button.component.html',
  styleUrl: './sorting-button.component.scss',
})
export class SortingButtonComponent {
  @Input() sortPlaceholder: string = '';
  @Input() sortBy: SortingBy = 'Id';

  sortDir$ = this._paginationService.sortDir$;
  sortBy$ = this._paginationService.sortBy$;

  constructor(private readonly _paginationService: PaginationService) {}

  handleToggleSortingDirMode(): void {
    this._paginationService.toggleSortDir(this.sortBy);
  }
}
