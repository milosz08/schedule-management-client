/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: login-helpers.effects.ts
 * Last modified | Ostatnia modyfikacja: 03/05/2022, 00:15
 * Project name | Nazwa Projektu: angular-po-schedule-management-client
 *
 * Klient | Client: <https://github.com/Milosz08/Angular_PO_Schedule_Management_Client>
 * Serwer | Server: <https://github.com/Milosz08/ASP.NET_PO_Schedule_Management_Server>
 *
 * Client for the ASP.NET Core application to manage schedule for sample university. Written with the Angular Framework
 * for generating dynamic web applications. Project for the teaching course "Objected Oriented Programming".
 *
 * Klient dla aplikacji ASP.NET Core służącej do zarządzania planem zajęć uczelni. Napisany przy użyciu frameworka
 * Angular do generowania dynamicznych aplikacji webowych. Projekt wykonany na zajęcia "Programowanie
 * Obiektowe".
 */

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';

import * as NgrxAction_SES from '../session.actions';
import * as NgrxAction_REM from '../../../../auth-module/ngrx-store/remember-user-ngrx-store/remember-user.actions';

import { SUCCESS_LOGIN } from '../session.actions';
import { SESSION_REDUCER, SessionReducerType } from '../session.selectors';
import { ModalsReducerType } from '../../modals-ngrx-store/modals.selectors';

import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';
import { BrowserStorageService } from '../../../services/browser-storage.service';
import { ImageManipulationService } from '../../../services/image-manipulation.service';
import { RememberUserStorageService } from '../../../../auth-module/services/remember-user-storage.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa efektów pomocniczych dla efektów autoryzacji użytkowników (logowanie, wylogowywanie).
 */

@Injectable()
export class LoginHelpersEffects {

    public constructor(
        private _router: Router,
        private _actions$: Actions,
        private _authService: AuthService,
        private _sessionService: SessionService,
        private _store: Store<SessionReducerType>,
        private _modalsStore: Store<ModalsReducerType>,
        private _storageService: BrowserStorageService,
        private _rememberUsersService: RememberUserStorageService,
        private _imageManipulationService: ImageManipulationService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę przejścia na stronę startową przy wywołaniu akcji poprawnego zalogowania
     * lub wylogowania z systemu.
     */
    public loginLogoutRedirect$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__successLogin, NgrxAction_SES.__logout),
            tap(action => {
                this._modalsStore.dispatch(NgrxAction_REM.__setAutoFilledEmail({ emailValue: '' }));
                const ifRedirect = action.type === SUCCESS_LOGIN && action.ifRedirectToRoot;
                if (ifRedirect) {
                    this._router.navigate([ '/' ]).then(r => r);
                }
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt pośredniczący dostarczający obiekt informacji o użytkowniku do zapisania w mechanizmie local storage.
     */
    public saveUserAfterSuccesedLogin = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__successLogin),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            map(([ action, state ]) => {
                this._store.dispatch(NgrxAction_SES.__saveUserAfterSuccessLogin({
                    userData: state.userData, ifRedirectToRoot: action.ifRedirectToRoot
                }));
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt pośredniczący dostarczający obiekt informacji o zdjęciu użytkownika do zapisania w
     * mechanizmie local storage.
     */
    public saveUserImageAfterSuccessedLogin = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__succesedGetImage),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            map(([ _, state ]) => {
                this._store.dispatch(NgrxAction_SES.__saveUserImageAfterSuccessLogin({
                    userData: state.userData, userImage: state.userImage
                }));
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę automatycznego logowania (przy uruchomieniu strony)
     * pobierając dane z magazynu local storage przy pomocy serwisu BrowserStorageService
     */
    public userAutoLogin$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__autoLogin),
            map(() => {
                const data = this._storageService.getUserFromStorage();
                if (data) {
                    const imageUri = this._storageService.getUserImageFromStorage();
                    this._store.dispatch(NgrxAction_SES.__succesedGetImage({ imageUri }));
                    this._store.dispatch(NgrxAction_SES.__setNewToken({ data }));
                    this._sessionService.allSessionCountersRerun(data);
                    return NgrxAction_SES.__successLogin({ data, ifRedirectToRoot: false });
                }
                return NgrxAction_SES.__logout({ ifRedirectToRoot: false });
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę zamiany/dodania zdjęcia użytkownika (aktualizuje również zawartość w local
     * storage).
     */
    public addCHangeUserImage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__updateOrAddUserImage),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            mergeMap(([ action, store ]) => {
                return this._authService.addChangeUserImage(action.userImage).pipe(
                    map(res => {
                        const imageUri = this._storageService.addUpdateUserImage(action.userImage);
                        this._rememberUsersService.updateOrDeleteSelectedUserImage(store.userData!.dictionaryHash, imageUri, false);
                        return NgrxAction_SES.__successUpdateOrAddUserImage({
                            userImageUrl: this._storageService.addUpdateUserImage(action.userImage), serverRes: res.message });
                    }),
                    catchError(({ error }) => {
                        if (error) {
                            return of(NgrxAction_SES.__failureUpdateOrAddUserImage({ serverRes: error.message }));
                        }
                        return of(NgrxAction_SES.__failureUpdateOrAddUserImage({
                            serverRes: 'Nieznany błąd podczas dodawania/aktualizowania zdjęcia. Spróbuj ponownie.' }));
                    }),
                )
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę usuwania zdjęcia użytkownika (usuwa również zawartość w local
     * storage).
     */
    public deleteUserImage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__deleteUserImage),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            mergeMap(([ _, store ]) => {
                return this._authService.deleteUserImage().pipe(
                    map(res => {
                        this._storageService.deleteUserImage();
                        this._rememberUsersService.updateOrDeleteSelectedUserImage(store.userData!.dictionaryHash, '', true);
                        return NgrxAction_SES.__successDeleteUserImage({ serverRes: res.message });
                    }),
                    catchError(({ error }) => {
                        if (error) {
                            return of(NgrxAction_SES.__failureDeleteUserImage({ serverRes: error.message }));
                        }
                        return of(NgrxAction_SES.__failureDeleteUserImage({
                            serverRes: 'Nieznany błąd podczas usuwania zdjęcia. Spróbuj ponownie.' }));
                    }),
                )
            }),
        );
    });
}