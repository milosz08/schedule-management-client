/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: remember-schedule-local-storage.service.ts
 * Last modified | Ostatnia modyfikacja: 01/06/2022, 20:04
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

import { RememberScheduleDataModel } from '../ngrx-store/shared-ngrx-store/ngrx-models/remember-schedule-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiadający za zarządzanie zapamiętanymi planami zajęć przy pomocy mechnizmu local storage.
 */

@Injectable({
    providedIn: 'root',
})
export class RememberScheduleLocalStorageService {

    private static readonly REMEMBER_SCHEDULE_KEY: string = 'schedule__rememberlinks' as const;

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Aktualizowanie zapamiętanych planów. Metoda usuwa poprzednio zapisane plany i wstawia nowy obiekt.
     */
    public updateScheduleRememberLinks(rememberLinks: Array<RememberScheduleDataModel>): void {
        localStorage.removeItem(RememberScheduleLocalStorageService.REMEMBER_SCHEDULE_KEY);
        localStorage.setItem(RememberScheduleLocalStorageService.REMEMBER_SCHEDULE_KEY, JSON.stringify(rememberLinks));
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Pobieranie wszystkich zapamiętanych planów z local storage. Jeśli nic nie znajdzie, zwraca pustą tablicę.
     */
    public getScheduleRememberLinks(): Array<RememberScheduleDataModel> {
        const scheduleBeforeParse = localStorage.getItem(RememberScheduleLocalStorageService.REMEMBER_SCHEDULE_KEY);
        if (scheduleBeforeParse) {
            return JSON.parse(scheduleBeforeParse);
        }
        return [];
    };
}