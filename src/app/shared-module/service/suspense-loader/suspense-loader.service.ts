/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SuspenseLoaderService {
  private _isLoading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly _router: Router,
    @Inject(DOCUMENT) private readonly _document: Document
  ) {
    this._router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.startGlobalLoader();
      } else if (event instanceof RouteConfigLoadEnd) {
        setTimeout(() => {
          this.stopGlobalLoader();
        }, 1000);
      }
    });
  }

  startGlobalLoader(): void {
    disableBodyScroll(this._document.documentElement);
    this._isLoading$.next(true);
  }

  stopGlobalLoader(): void {
    this._isLoading$.next(false);
    enableBodyScroll(this._document.documentElement);
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
