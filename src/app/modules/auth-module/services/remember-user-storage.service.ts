/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: remember-user-storage.service.ts
 * Last modified | Ostatnia modyfikacja: 01/05/2022, 19:13
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

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as NgrxAction_REM from '../ngrx-store/remember-user-ngrx-store/remember-user.actions';
import { RememberUserReducerType } from '../ngrx-store/remember-user-ngrx-store/remember-user.selectors';

import { AuthResponseDataModel } from '../../../models/auth-response-data.model';
import { RememberAccountModel } from '../../../models/remember-account.model';

import { BrowserStorageService } from '../../shared-module/services/browser-storage.service';
import { ImageManipulationService } from '../../shared-module/services/image-manipulation.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiadający za mechanizm pamiętania ostatnio zalogowanych użytkowników w
 * magazynie local storage.
 */

@Injectable({
    providedIn: 'root'
})
export class RememberUserStorageService {

    public static readonly USER_REMEMBER_ACCOUNT: string = 'users__remember_accounts' as const;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _storageService: BrowserStorageService,
        private _imageManipulationService: ImageManipulationService,
        private _store: Store<RememberUserReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Zapisywanie konta użytkownika w magazynie local storage. Jeśli jakieś konta już są zapisane, dodawane są
     * nowe. Posiada walidację (uniemożliwia wprowadzenie dwóch takich samych kont).
     */
    public saveUserDataInLocalStorage(userData: AuthResponseDataModel, imageUri: string): void {
        const existingItems = localStorage.getItem(RememberUserStorageService.USER_REMEMBER_ACCOUNT);
        if (existingItems) { // jeśli jakieś konta są zapisane, dodaj nowe
            this.setNewUserAccountInStorage(existingItems, userData, imageUri);
        } else { // jeśli żadne konto nie jest zapisane, zapisz
            const userDataMapped = RememberUserStorageService.userDataToStorageDataMapped(userData);
            if (imageUri !== '') { // jeśli konto zawiera obrazek
                this.saveFirstUserAccountWithImageInStorage(userDataMapped, imageUri);
            } else { // jeśli konto nie zawiera obrazka
                localStorage.setItem(RememberUserStorageService.USER_REMEMBER_ACCOUNT, JSON.stringify([ userDataMapped ]));
                this._store.dispatch(NgrxAction_REM.__saveSingleAccount({ userAccount: userDataMapped }));
            }
        }
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Zwracanie wszystkich zapisanych kont w local storage. Jeśli nie ma zapisanych kont, zwracanie pustej tablicy.
     */
    public loadAllSavedAccounts(): Array<RememberAccountModel> {
        const allAccounts = localStorage.getItem(RememberUserStorageService.USER_REMEMBER_ACCOUNT);
        if (allAccounts) {
            const allAccountsAfterParse: Array<RememberAccountModel> = JSON.parse(allAccounts);
            return this.convertImageFromUriToBlob(allAccountsAfterParse);
        }
        return [];
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Usuwanie wszystkich zapisanych użytkowników z magazynu local storage.
     */
    public removeAllSaveUsersFromLocalStorage(): void {
        localStorage.removeItem(RememberUserStorageService.USER_REMEMBER_ACCOUNT);
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Usuwanie pojedynczego zapisanego konta użytkownika na podstawie wartości klucza użytkownika.
     */
    public removeSaveUserFromLocalStorageBaseId(userId: string): void {
        const { USER_REMEMBER_ACCOUNT } = RememberUserStorageService;
        const allUsers = localStorage.getItem(USER_REMEMBER_ACCOUNT);
        if (allUsers) {
            const allUsersAfterParse: Array<RememberAccountModel> = JSON.parse(allUsers);
            const afterExcludedUserById = allUsersAfterParse.filter(user => user.dictionaryHash !== userId);
            this._storageService.updateLocalStorageContent(USER_REMEMBER_ACCOUNT, afterExcludedUserById);
        }
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Aktualizacja stanu zdjęcia zapamiętanych użytkownika na podstawie przekazywanego parametru ID (aktualizacja
     * odbywa się w panelu administratora).
     */
    public updateOrDeleteSelectedUserImage(userId: string, imageUri: string, ifRemove: boolean): void {
        const allAccounts = localStorage.getItem(RememberUserStorageService.USER_REMEMBER_ACCOUNT);
        if (allAccounts) {
            const allAccountsAfterParse: Array<RememberAccountModel> = JSON.parse(allAccounts);
            const findAccountIndex = allAccountsAfterParse.findIndex(user => user.dictionaryHash === userId);
            if (findAccountIndex !== -1) {
                if (ifRemove) {
                    allAccountsAfterParse[findAccountIndex].image = '';
                    this._storageService.updateLocalStorageContent(RememberUserStorageService.USER_REMEMBER_ACCOUNT,
                        allAccountsAfterParse);
                } else {
                    const image = new Image();
                    image.src = imageUri;
                    image.onload = () => {
                        allAccountsAfterParse[findAccountIndex].image = this._imageManipulationService
                            .changeImageDimensions(image, 80);
                        this._storageService.updateLocalStorageContent(RememberUserStorageService.USER_REMEMBER_ACCOUNT,
                            allAccountsAfterParse);
                    };
                }
            }
        }
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda zapisująca pierwszego użytkownika w local storage, który posiada zapisany obrazek.
     */
    private saveFirstUserAccountWithImageInStorage(userAccount: RememberAccountModel, imageUri: string): void {
        const image = new Image();
        image.src = imageUri;
        image.onload = () => {
            userAccount.image = this._imageManipulationService.changeImageDimensions(image, 80);
            localStorage.setItem(RememberUserStorageService.USER_REMEMBER_ACCOUNT, JSON.stringify([ userAccount ]));
            userAccount.image = this._imageManipulationService.convertSingleImageFromBytesToUri(userAccount.image);
            this._store.dispatch(NgrxAction_REM.__saveSingleAccount({ userAccount }));
        };
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Dodawanie nowego konta do magazynu local storage (walidacja w postaci sprawdzania duplikatów kont).
     */
    private setNewUserAccountInStorage(jsonAccounts: string, userData: AuthResponseDataModel, imageUri: string): void {
        const { USER_REMEMBER_ACCOUNT } = RememberUserStorageService;
        const existingItemsAfterParse: Array<RememberAccountModel> = JSON.parse(jsonAccounts);

        const findIfItemExist = existingItemsAfterParse
            .find(({ dictionaryHash }) => dictionaryHash === userData.dictionaryHash);

        if (!findIfItemExist) { // jeśli konto nie istnieje
            const newUserData = RememberUserStorageService.userDataToStorageDataMapped(userData);
            if (imageUri !== '') { // jeśli konto zawiera obrazek
                const image = new Image();
                image.src = imageUri;
                image.onload = () => {
                    newUserData.image = this._imageManipulationService.changeImageDimensions(image, 80);
                    existingItemsAfterParse.push(newUserData);
                    this._storageService.updateLocalStorageContent(USER_REMEMBER_ACCOUNT, existingItemsAfterParse);
                    newUserData.image = this._imageManipulationService.convertSingleImageFromBytesToUri(newUserData.image);
                    this._store.dispatch(NgrxAction_REM.__saveSingleAccount({ userAccount: newUserData }));
                };
            } else { // jeśli konto nie zawiera obrazka
                existingItemsAfterParse.push(newUserData);
                this._storageService.updateLocalStorageContent(USER_REMEMBER_ACCOUNT, existingItemsAfterParse);
                this._store.dispatch(NgrxAction_REM.__saveSingleAccount({ userAccount: newUserData }));
            }
        }
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda konwertująca obrazek użytkownika w postaci tablicy bajtów na adres URI (zapisywany w ngrx storze).
     */
    private convertImageFromUriToBlob(allAccounts: Array<RememberAccountModel>): Array<RememberAccountModel> {
        return allAccounts.map(account => {
            if (account.image !== '') {
                account.image = this._imageManipulationService.convertSingleImageFromBytesToUri(account.image);
                return account;
            }
            return account;
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Mapowanie modelu userData na model RememberAccount.
     */
    private static userDataToStorageDataMapped(userData: AuthResponseDataModel): RememberAccountModel {
        const { dictionaryHash, nameWithSurname, role, email } = userData;
        return {
            dictionaryHash, nameWithSurname, role, email, image: '',
        };
    };
}