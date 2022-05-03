/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: api-configurer.helper.ts
 * Last modified | Ostatnia modyfikacja: 25/04/2022, 00:18
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
import { environment } from '../../environments/environment';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa przechowujący dane statyczne dla łączenia się z backendem.
 */

@Injectable({
    providedIn: 'root',
})
export class ApiConfigurerHelper {

    private static readonly API_PREFIX = environment.backendApi + '/api/v1/dotnet/';

    public readonly LOGIN_USER = ApiConfigurerHelper.API_PREFIX + 'auth/login';
    public readonly GET_USER_IMAGE = ApiConfigurerHelper.API_PREFIX + 'file/get-avatar';
    public readonly GET_REFRESH_TOKEN = ApiConfigurerHelper.API_PREFIX + 'auth/refresh-token';
    public readonly CHANGE_DEFAULT_PASSWORD = ApiConfigurerHelper.API_PREFIX + 'auth/change-password';
    public readonly RESET_PASSWORD_SEND_TOKEN_VIA_EMAIL = ApiConfigurerHelper.API_PREFIX + 'auth/reset-password-email';
    public readonly RESET_PASSWORD_VALIDATE_TOKEN = ApiConfigurerHelper.API_PREFIX + 'auth/confirm-reset-password';
    public readonly RESET_PASSWORD_VIA_TOKEN = ApiConfigurerHelper.API_PREFIX + 'auth/reset-password';
}