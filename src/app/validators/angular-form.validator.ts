/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: angular-form.validator.ts
 * Last modified | Ostatnia modyfikacja: 01/05/2022, 01:40
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

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa przechowująca customowe walidatory używane w API angular forms użytych w aplikacji.
 */

export class AngularFormValidator {

    /**
     * Walidator sprawdzający, czy nowe hasło i potwierdzenie nowego hasła są takie same. Jeśli nie zwraca
     * passwordMismatch ustawiony na wartość true.
     */
    public static passwordMismatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('newPassword');
        const repeatPassword = control.get('newPasswordConfirmed');
        return password && repeatPassword && password.value !== repeatPassword.value ? {
            passwordMismatch: true,
        } : null;
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Walidator sprawdzający nowe hasło, czy posiada jedną wielką literę, jedną cyfrę i jeden znak specjalny oraz
     * czy ma co najmniej 8 znaków. Jeśli któreś z tych warunków nie jest spełniony, generuje notMath z wartością true.
     */
    public static passwordRegexpValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            const notMath = strongRegex.test(control.value);
            return !notMath ? {
                notMath: {
                    value: control.value
                }
            } : null;
        };
    };
}