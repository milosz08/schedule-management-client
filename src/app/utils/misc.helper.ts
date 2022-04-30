/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: MiscHelper.ts
 * Last modified | Ostatnia modyfikacja: 10/04/2022, 13:36
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

import { UserIdentityModel } from '../ngrx-store/session-ngrx-store/ngrx-models/user-identity.model';

/**
 * Dodatkowe metody pomocnicze używane w aplikacji.
 */

export class MiscHelper {

    private static _randomCharacters: string = 'abcdefghijklmnoprstquvwxyzABCDEFGHIJKLMNOPRSTQUWXYZ0123456789';

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda umożliwiająca porówanie typu enum.
     */
    public static compareEnum = <T>(e: T) => (key: any): key is T[keyof T] => {
        return (Object as any).values(e).includes(key as T[keyof T])
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda umożliwiająca generowanie pseudolosowego ciągu znaków (na podstawie parametru).
     */
    public static randomCharactersGenerator(length: number = 5): string {
        return Array.from({ length }).map(() => {
            const radomizerIndex = Math.floor(Math.random() * (this._randomCharacters.length - 1));
            return this._randomCharacters[radomizerIndex];
        }).join('');
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda konwertująca typ enum nazwy roli użytkownika na nazwę spolszczoną.
     */
    public static convertEngToPlUserRole(role: UserIdentityModel): string {
        switch(role) {
            case 'ADMINISTRATOR':   return 'administrator';
            case 'EDITOR':          return 'edytor';
            case 'TEACHER':         return 'nauczyciel';
            default:                return 'student';
        }
    };
}