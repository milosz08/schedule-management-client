/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: first-change-password-storage.service.ts
 * Last modified | Ostatnia modyfikacja: 30/04/2022, 22:48
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

import { FirstChangePasswordDataModel } from '../ngrx-store/session-ngrx-store/ngrx-models/first-change-password-data.model';

/**
 * Serwis realizujący obsługę local storage dla zmiany oryginalnego hasła generowanego przez system.
 */

@Injectable({
    providedIn: 'root',
})
export class FirstChangePasswordStorageService {

    public static readonly DISABLE_SEE_CHANGE_PASS: string = 'users__disable_change_password_page' as const;

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Aktywowanie zablokowania strony do zmiany początkowego hasła (na podstawie wartości userId).
     */
    public activeDisabledFirstChangePage(userId: string): void {
        const userData = localStorage.getItem(FirstChangePasswordStorageService.DISABLE_SEE_CHANGE_PASS);
        if (userData) { // jeśli jest to któryś z kolei użytkownik, dopisz
            const userDataAfterParse: Array<FirstChangePasswordDataModel> = JSON.parse(userData);
            const findExistUser = userDataAfterParse.find(user => user._dictionaryHash === userId);
            if (!findExistUser) { // dodaj tylko różnych użytkowników
                userDataAfterParse.push(new FirstChangePasswordDataModel(userId, true));
                const savedData = JSON.stringify(userDataAfterParse);
                localStorage.removeItem(FirstChangePasswordStorageService.DISABLE_SEE_CHANGE_PASS);
                localStorage.setItem(FirstChangePasswordStorageService.DISABLE_SEE_CHANGE_PASS, savedData);
            }
        } else { // jeśli jest to pierwszy użytkownik
            const savedData = JSON.stringify([ new FirstChangePasswordDataModel(userId, true) ]);
            localStorage.setItem(FirstChangePasswordStorageService.DISABLE_SEE_CHANGE_PASS, savedData);
        }
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Zwraca, czy dla danego użytkownika widocznośc strony do zmiany hasła początkowego jest włączona
     * lub wyłączona.
     */
    public checkIfFirstChangePasswordIsDisabled(userId: string): boolean {
        const userData = localStorage.getItem(FirstChangePasswordStorageService.DISABLE_SEE_CHANGE_PASS);
        if (userData) {
            const userDataAfterParsed: Array<FirstChangePasswordDataModel> = JSON.parse(userData);
            return Boolean(userDataAfterParsed.find(user => user._dictionaryHash === userId));
        }
        return false;
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Dezaktywowanie blokady na wyświetlanie strony umożliwiającej zmianę początkowego hasła
     * wygenerowanego przez system (na podstawie wartości userId).
     */
    public removeDisabledFirstChangePage(userId: string): void {
        const userData = localStorage.getItem(FirstChangePasswordStorageService.DISABLE_SEE_CHANGE_PASS);
        if (userData) {
            const userDataAfterParsed: Array<FirstChangePasswordDataModel> = JSON.parse(userData);
            const excludeUser = userDataAfterParsed.filter(user => user._dictionaryHash !== userId);
            localStorage.removeItem(FirstChangePasswordStorageService.DISABLE_SEE_CHANGE_PASS);
            localStorage.setItem(FirstChangePasswordStorageService.DISABLE_SEE_CHANGE_PASS, JSON.stringify(excludeUser));
        }
    };
}