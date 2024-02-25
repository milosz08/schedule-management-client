/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginReq } from '~/auth-module/models/login.model';
import { LoginService } from '~/auth-module/services/login/login.service';
import { SavedAccountsService } from '~/auth-module/services/saved-accounts/saved-accounts.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  loginForm: FormGroup;
  saveAccount = true;

  saveUserLabel$ = this._savedAccountsService.saveUserLabel$;
  isAddNewUsersDisabled$ = this._savedAccountsService.isAddNewUsersDisabled$;
  selectedAccountEmail$ = this._savedAccountsService.selectedAccountEmail$;
  isLoading$ = this._loginService.isLoading$;

  constructor(
    private readonly _loginService: LoginService,
    private readonly _savedAccountsService: SavedAccountsService,
    private readonly _router: Router
  ) {
    super();
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._savedAccountsService.selectedAccountEmail$
    ).subscribe(email => this.loginForm.get('login')?.patchValue(email));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitLoginForm(): void {
    const loginReq = this.loginForm.getRawValue() as LoginReq;
    this.wrapAsObservable$(
      this._loginService.login$(loginReq, this.saveAccount)
    ).subscribe({
      next: async redirect => {
        this.loginForm.reset();
        await this._router.navigateByUrl(redirect);
      },
    });
  }

  handleToggleSaveAccount(state: boolean): void {
    this.saveAccount = state;
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.loginForm, controlName);
  }
}
