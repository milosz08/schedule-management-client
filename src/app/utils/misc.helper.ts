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

import { FormGroup } from '@angular/forms';
import moment from 'moment';

import { UserIdentityType } from '../types/user-identity.type';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Dodatkowe metody pomocnicze używane w aplikacji.
 */

export class MiscHelper {

    private static _randomCharacters: string = 'abcdefghijklmnoprstquvwxyzABCDEFGHIJKLMNOPRSTQUWXYZ0123456789';
    public static _hoursTable: Array<number> = Array.from({ length: 16 }, (v, j) => j);

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
     * Metoda pobierająca typ użytkownika i zwracająca literkę wraz z customową klasą.
     */
    public static createUserRoleSingleLetter(role: UserIdentityType): { letter: string, class: string } {
        switch(role) {
            case UserIdentityType.ADMINISTRATOR:    return { letter: 'a', class: 'role-dot--administrator' };
            case UserIdentityType.EDITOR:           return { letter: 'e', class: 'role-dot--editor' };
            case UserIdentityType.TEACHER:          return { letter: 'n', class: 'role-dot--teacher' };
            default:                                return { letter: 's', class: 'role-dot--student' };
        }
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca typ użytkownika i zwracająca pełną nazwę wraz z klasą ustawiającą kolor.
     */
    public static createUserRoleAllPhrase(role: UserIdentityType): { label: string, class: string } {
        switch(role) {
            case UserIdentityType.ADMINISTRATOR:    return { label: 'administrator', class: 'role--administrator' };
            case UserIdentityType.EDITOR:           return { label: 'edytor', class: 'role--editor' };
            case UserIdentityType.TEACHER:          return { label: 'nauczyciel', class: 'role--teacher' };
            default:                                return { label: 'student', class: 'role--student' };
        }
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda sprawdzająca pole w reaktywnym formularzu angular po wzlgędem zgodności (tylko w przypadku focusa).
     */
    public static checkNgFormError(form: FormGroup, inputName: string): boolean {
        return form.get(inputName)!.touched && !form.get(inputName)!.valid;
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda zwracająca aktualny rok studiów na podstawie bieżącego roku kalendarzowego. Metoda zwraca dane w formacie
     * YYYY/YYYY.
     */
    public static get __currentStudyYear(): string {
        const now = moment();
        return now.month() < 10 ? `${now.year() - 1}/${now.year()}` : `${now.year()}/${now.year() + 1}`;
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda zwracająca dane aktualnego tygodnia (numer, data początkowa i końcowa oraz numer tygodnia). Metoda zwraca
     * dane w formacie DD.MM - DD.MM (YYYY, DN).
     */
    public static get __currentWeekData(): string {
        const now = moment();
        return `${now.weekday(1).format("DD.MM")} - ${now.weekday(7).format("DD.MM")} (${now.year()}, ${now.isoWeek()})`;
    };
}