/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SuspenseLoaderService {
  private _isLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private readonly _router: Router) {
    this._router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this._isLoading$.next(true);
      } else if (event instanceof RouteConfigLoadEnd) {
        setTimeout(() => this._isLoading$.next(false), 1000);
      }
    });
  }

  async reloadAngularPageWithRouter(): Promise<void> {
    const currentUrl = this._router.url;
    await this._router.navigateByUrl('/', { skipLocationChange: true });
    await this._router.navigateByUrl(currentUrl);
  }

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }
}
