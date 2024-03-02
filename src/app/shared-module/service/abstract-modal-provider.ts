/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractLoadingProvider } from './abstract-loading-provider';

export abstract class AbstractModalProvider extends AbstractLoadingProvider {
  protected _isOpen$ = new BehaviorSubject<boolean>(false);

  setIsOpen(isOpen: boolean): void {
    this._isOpen$.next(isOpen);
  }

  get isOpen$(): Observable<boolean> {
    return this._isOpen$.asObservable();
  }
}
