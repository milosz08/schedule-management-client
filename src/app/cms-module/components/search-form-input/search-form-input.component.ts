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
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-search-form-input',
  templateUrl: './search-form-input.component.html',
  styleUrl: './search-form-input.component.scss',
})
export class SearchFormInputComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() inputPlaceholder = '';
  @Output() emitSearchContent = new EventEmitter<string>();

  inputId = '';

  private _searchQuery$ = new BehaviorSubject<string>('');

  constructor(private readonly _paginationService: PaginationService) {
    super();
  }

  ngOnInit(): void {
    this.inputId = `${this.inputPlaceholder.replaceAll(' ', '_')}__text__${uuidv4()}`;
    this.wrapAsObservable$(this._searchQuery$)
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(content => this._paginationService.setSearchPhrase(content));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleOnChangeContent(event: Event): void {
    this._searchQuery$.next((event.target as HTMLInputElement)?.value || '');
  }
}
