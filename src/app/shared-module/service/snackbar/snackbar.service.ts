/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import {
  SnackbarData,
  SnackbarPersistorData,
} from '~/shared-module/types/snackbar.type';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private _snackbars$ = new BehaviorSubject<SnackbarPersistorData[]>([]);

  addSnackbar(snackbar: SnackbarData): void {
    const newSnackbarId = uuidv4();
    this._snackbars$.next([
      ...this._snackbars$.value,
      { id: newSnackbarId, ...snackbar },
    ]);
    setTimeout(() => {
      const queueWithoutElement = this._snackbars$.value.filter(
        ({ id }) => id !== newSnackbarId
      );
      this._snackbars$.next(queueWithoutElement);
    }, 5000);
  }

  get snackbars$(): Observable<SnackbarData[]> {
    return this._snackbars$.asObservable();
  }
}
