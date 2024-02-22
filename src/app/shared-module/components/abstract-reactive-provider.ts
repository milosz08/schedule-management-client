/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Observable, Subject, takeUntil } from 'rxjs';

export abstract class AbstractReactiveProvider {
  protected readonly _subscriptionHook = new Subject<void>();

  protected unmountAllSubscriptions(): void {
    this._subscriptionHook.next();
    this._subscriptionHook.complete();
  }

  protected wrapAsObservable$<T>(input: Observable<T>): Observable<T> {
    return input.pipe(takeUntil(this._subscriptionHook));
  }
}
