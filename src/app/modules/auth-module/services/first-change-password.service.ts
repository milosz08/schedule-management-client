/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: first-change-password.service.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 18:16
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
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiConfigurerHelper } from '../../../utils/api-configurer.helper';

import { ResponseServerMessageModel } from '../../../models/response-server-message.model';
import { RequestFirstChangePasswordModel } from '../../../models/request-first-change-password.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis obsługujący żądania HTTP dla efektów i reducerów odpowiadających za procedurę zmiany pierwszego hasła
 * wygenerowanego przez system.
 */

@Injectable({
    providedIn: 'root',
})
export class FirstChangePasswordService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Żądanie HTTP POST do API w celu zmiany domyślnego hasła (wygenerowanego przez system).
     */
    public userChangeDefaultPassword(
        userId: string, passwords: RequestFirstChangePasswordModel,
    ): Observable<ResponseServerMessageModel> {
        return this._http.post<ResponseServerMessageModel>(
            this._endpoints.CHANGE_DEFAULT_PASSWORD,
            passwords, { params: { userId } }
        );
    };
}