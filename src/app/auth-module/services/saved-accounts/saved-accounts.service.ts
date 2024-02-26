/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { LoginRes } from '~/shared-module/models/identity.model';
import { SavedAccountRes } from '~/shared-module/models/memory-storage.model';
import { AbstractLoadingProvider } from '~/shared-module/service/abstract-loading-provider';
import { LocalStorageService } from '~/shared-module/service/local-storage/local-storage.service';
import { MemoryStorageHttpClientService } from '~/shared-module/service/memory-data-http-client/memory-storage-http-client.service';

@Injectable()
export class SavedAccountsService extends AbstractLoadingProvider {
  public static MAX_ACCOUNTS_TO_SAVE = 10;

  private _savedAccounts$ = new BehaviorSubject<SavedAccountRes[]>([]);
  private _selectedAccount$ = new Subject<SavedAccountRes>();

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _memoryStorageHttpClientService: MemoryStorageHttpClientService
  ) {
    super();
  }

  loadSavedAccounts$(): Observable<SavedAccountRes[]> {
    const savedAccountIds =
      this._localStorageService.get<number[]>('saved_accounts') ?? [];
    this.setLoading(true);
    return this._memoryStorageHttpClientService
      .checkAccounts$({
        savedAccountIds,
      })
      .pipe(
        tap(savedAccounts => {
          this.setLoading(false);
          this._savedAccounts$.next(savedAccounts);
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  addUserAccount(afterLoginData: LoginRes): void {
    const existingAccount = this._savedAccounts$.value.find(
      ({ email }) => email === afterLoginData.email
    );
    if (!existingAccount) {
      const { id, nameWithSurname, login, role, email, profileImageUrl } =
        afterLoginData;
      const account: SavedAccountRes = {
        id,
        login,
        nameWithSurname,
        role,
        email,
        profileImageUrl,
      };
      const accountsToPersist = [...this._savedAccounts$.value, account];
      this._savedAccounts$.next(accountsToPersist);
      this._localStorageService.save(
        'saved_accounts',
        accountsToPersist.map(({ id }) => id)
      );
    }
  }

  selectUserAccount(userAccount: SavedAccountRes): void {
    this._selectedAccount$.next(userAccount);
  }

  deleteUserAccount(userAccount: SavedAccountRes): void {
    const accountsWithoutUser = this._savedAccounts$.value.filter(
      account => account.id !== userAccount.id
    );
    this._savedAccounts$.next(accountsWithoutUser);
    this._localStorageService.save('saved_accounts', accountsWithoutUser);
  }

  deleteAllUserAccounts(): void {
    this._savedAccounts$.next([]);
    this._localStorageService.save('saved_accounts', []);
  }

  get saveUserLabel$(): Observable<string> {
    return this.isAddNewUsersDisabled$.pipe(
      map(isDisabled =>
        isDisabled
          ? `Możesz zapamiętać maksymalnie ${SavedAccountsService.MAX_ACCOUNTS_TO_SAVE} kont`
          : 'Zapamiętaj konto'
      )
    );
  }
  get isAddNewUsersDisabled$(): Observable<boolean> {
    return this._savedAccounts$.pipe(
      map(
        accounts => accounts.length > SavedAccountsService.MAX_ACCOUNTS_TO_SAVE
      )
    );
  }
  get selectedAccountEmail$(): Observable<string> {
    return this._selectedAccount$.pipe(map(({ email }) => email));
  }
  get savedAccounts$(): Observable<SavedAccountRes[]> {
    return this._savedAccounts$.asObservable();
  }
}
