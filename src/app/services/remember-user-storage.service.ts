/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: remember-user-storage.service.ts
 * Last modified | Ostatnia modyfikacja: 30/04/2022, 14:08
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

import { AuthResponseDataModel } from '../ngrx-store/session-ngrx-store/ngrx-models/auth-response-data.model';
import { RememberAccountModel } from '../ngrx-store/session-ngrx-store/ngrx-models/remember-account.model';

/**
 * Serwis odpowiadający za mechanizm pamiętania ostatnio zalogowanych użytkowników w
 * magazynie local storage.
 */

@Injectable({
    providedIn: 'root',
})
export class RememberUserStorageService {

    public static readonly USER_REMEMBER_ACCOUNT: string = "users__remember_accounts" as const;

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Zapisywanie konta użytkownika w magazynie local storage. Jeśli jakieś konta już są zapisane, dodawane są
     * nowe. Posiada walidację (uniemożliwia wprowadzenie dwóch takich samych kont).
     */
    public saveUserDataInLocalStorage(userData: AuthResponseDataModel): RememberAccountModel | null {
        const {
            USER_REMEMBER_ACCOUNT, userDataToStorageDataMapped, setNewUserAccountInStorage
        } = RememberUserStorageService;
        const existingItems = localStorage.getItem(USER_REMEMBER_ACCOUNT);
        if (existingItems) { // jeśli jakieś konta są zapisane, dodaj nowe
            return setNewUserAccountInStorage(existingItems, userData);
        } else { // jeśli żadne konto nie jest zapisane, zapisz
            const userRememberAccount = userDataToStorageDataMapped(userData);
            localStorage.setItem(USER_REMEMBER_ACCOUNT, JSON.stringify([ userRememberAccount ]));
            return userRememberAccount;
        }
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Zwracanie wszystkich zapisanych kont w local storage. Jeśli nie ma zapisanych kont, zwracanie pustej tablicy.
     */
    public loadAllSavedAccounts(): Array<RememberAccountModel> {
        const allAccounts = localStorage.getItem(RememberUserStorageService.USER_REMEMBER_ACCOUNT);
        if (allAccounts) {
            return JSON.parse(allAccounts);
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
     * Usuwanie pojedynczego zapisanego konta użytkownika na podstawie wartości indeksu.
     */
    public removeSaveUserFromLocalStorageBaseId(userId: string): void {
        const { USER_REMEMBER_ACCOUNT } = RememberUserStorageService;
        const allUsers = localStorage.getItem(USER_REMEMBER_ACCOUNT);
        if (allUsers) {
            const allUsersAfterParse: Array<RememberAccountModel> = JSON.parse(allUsers);
            const afterExcludedUserById = allUsersAfterParse.filter(user => user.dictionaryHash !== userId);
            localStorage.removeItem(USER_REMEMBER_ACCOUNT);
            localStorage.setItem(USER_REMEMBER_ACCOUNT, JSON.stringify(afterExcludedUserById));
        }
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Mapowanie modelu userData na model RememberAccount.
     */
    private static userDataToStorageDataMapped(userData: AuthResponseDataModel): RememberAccountModel {
        const { dictionaryHash, nameWithSurname, role, email } = userData;
        return {
            dictionaryHash, nameWithSurname, role, email,
        };
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Dodawanie nowego konta do magazynu local storage (walidacja w postaci sprawdzania duplikatów kont).
     */
    private static setNewUserAccountInStorage(
        jsonAccounts: string, userData: AuthResponseDataModel
    ): RememberAccountModel | null {
        const { USER_REMEMBER_ACCOUNT, userDataToStorageDataMapped } = RememberUserStorageService;
        const existingItemsAfterParse: Array<RememberAccountModel> = JSON.parse(jsonAccounts);
        const findIfItemExist = existingItemsAfterParse
            .find(({ dictionaryHash }) => dictionaryHash === userData.dictionaryHash)
        if (!findIfItemExist) { // jeśli konto nie istnieje
            const newUserData = userDataToStorageDataMapped(userData);
            existingItemsAfterParse.push(newUserData);
            localStorage.removeItem(USER_REMEMBER_ACCOUNT);
            localStorage.setItem(USER_REMEMBER_ACCOUNT, JSON.stringify(existingItemsAfterParse));
            return newUserData;
        }
        return null;
    };
}