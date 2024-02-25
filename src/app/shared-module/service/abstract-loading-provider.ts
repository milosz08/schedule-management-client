/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractReactiveProvider } from '../components/abstract-reactive-provider';

export class AbstractLoadingProvider extends AbstractReactiveProvider {
  protected _isLoading$ = new BehaviorSubject<boolean>(false);

  protected setLoading(isLoading: boolean): void {
    this._isLoading$.next(isLoading);
  }

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }
}
