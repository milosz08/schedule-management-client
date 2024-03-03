/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '~/shared-module/service/local-storage/local-storage.service';

@Injectable()
export class DomService {
  private _menuVisibility$ = new BehaviorSubject<boolean>(true);

  constructor(private readonly _localStorageService: LocalStorageService) {
    this._menuVisibility$.next(
      this._localStorageService.get<boolean>('cms_menu_visibility') ?? true
    );
  }

  toggleMenuVisibility() {
    this.changeMenuVisibility(!this._menuVisibility$.value);
  }

  changeMenuVisibility(isVisible: boolean) {
    this._menuVisibility$.next(isVisible);
    this._localStorageService.save('cms_menu_visibility', isVisible);
  }

  get menuVisibility$(): Observable<boolean> {
    return this._menuVisibility$.asObservable();
  }
}
