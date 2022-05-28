/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: reset-password-form-unsave-changes.guard.ts
 * Last modified | Ostatnia modyfikacja: 03/05/2022, 04:22
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
import { CanDeactivate } from '@angular/router';

import { ResetPasswordPageComponent } from '../../modules/auth-module/pages/reset-password-page/reset-password-page.component';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Prosty strażnik umożliwiający zmianę trasy dopiero po zaakceptowaniu modala dla formularzy odzyskiwania hasła
 * (wysłanie nowego hasła).
 */

@Injectable({
    providedIn: 'root',
})
export class ResetPasswordFormUnsaveChangesGuard implements CanDeactivate<ResetPasswordPageComponent> {

    public canDeactivate(component: ResetPasswordPageComponent): boolean {
        if (component._discardChangesForm) {
            return window.confirm("Masz niezapisane zmiany. Nadal chcesz opuścić stronę?");
        }
        return true;
    };
}