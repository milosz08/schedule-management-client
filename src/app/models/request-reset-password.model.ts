/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: request-reset-password.model.ts
 * Last modified | Ostatnia modyfikacja: 03/05/2022, 02:08
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

interface ResetPasswordFormModel {
    newPassword: string;
    newPasswordConfirmed: string;
}

//----------------------------------------------------------------------------------------------------------------------

export class RequestResetPasswordModel {

    public newPassword: string;
    public newPasswordConfirmed: string;
    public bearerToken: string;

    public constructor(withoutBearer: ResetPasswordFormModel, bearer: string) {
        this.newPassword = withoutBearer.newPassword;
        this.bearerToken = bearer;
        this.newPasswordConfirmed = withoutBearer.newPasswordConfirmed;
    };
}