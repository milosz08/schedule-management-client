import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StorageKey } from '~/shared-module/types/local-storage.type';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private localStorage: Storage;

  constructor(@Inject(DOCUMENT) private readonly _document: Document) {
    if (!this._document.defaultView) {
      throw new Error('Default window environment not found!');
    }
    this.localStorage = this._document.defaultView.localStorage;
  }

  get<T>(storageKey: StorageKey): T | null {
    const preParsed = this.localStorage.getItem(storageKey);
    if (!preParsed) {
      return null;
    }
    return JSON.parse(preParsed);
  }

  save<T>(storageKey: StorageKey, data: T): void {
    this.localStorage.removeItem(storageKey);
    this.localStorage.setItem(storageKey, JSON.stringify(data));
  }

  remove(storageKey: StorageKey): void {
    this.localStorage.removeItem(storageKey);
  }
}
