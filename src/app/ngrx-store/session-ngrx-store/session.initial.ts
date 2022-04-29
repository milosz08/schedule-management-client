/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: session.initial.ts
 * Last modified | Ostatnia modyfikacja: 22/04/2022, 17:49
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

import { AuthResponseDataModel } from './ngrx-models/auth-response-data.model';


export interface InitialSessionStateTypes {
    userData: AuthResponseDataModel | null;
    errorMessage: string;
    userImage: string;
    sessionLeftTime: number;
    sessionEndModalVisibility: boolean;
    logoutModalVisibility: boolean;
}

export const initialSessionState: InitialSessionStateTypes = {
    userData: null,
    errorMessage: '',
    userImage: '',
    sessionLeftTime: 0,
    sessionEndModalVisibility: false,
    logoutModalVisibility: false,
};