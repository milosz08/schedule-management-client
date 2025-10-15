import { Component, OnDestroy, OnInit } from '@angular/core';
import { SavedAccountsService } from '~/auth-module/services/saved-accounts/saved-accounts.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { SavedAccountRes } from '~/shared-module/models/memory-storage.model';

@Component({
  selector: 'app-last-logins',
  templateUrl: './last-logins.component.html',
  styleUrl: './last-logins.component.scss',
})
export class LastLoginsComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  savedAccounts$ = this._savedAccountsService.savedAccounts$;
  isLoading$ = this._savedAccountsService.isLoading$;

  constructor(private readonly _savedAccountsService: SavedAccountsService) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._savedAccountsService.loadSavedAccounts$()
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSelectAccount(userAccount: SavedAccountRes): void {
    this._savedAccountsService.selectUserAccount(userAccount);
  }

  handleDeleteSavedAccount(userAccount: SavedAccountRes): void {
    this._savedAccountsService.deleteUserAccount(userAccount);
  }

  handleDeleteAllSavedAccounts(): void {
    this._savedAccountsService.deleteAllUserAccounts();
  }
}
