/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-post-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 11/05/2022, 18:43
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

import { CmsRegisterRequestDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-register-request-data.model';
import { CmsRegisterResponseDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-register-response-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiedzialny za łączenie się z API i wykonywanie zapytań POST do serwera (dodawanie nowych danych).
 */

@Injectable({
    providedIn: 'root'
})
export class CmsPostConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Rejestrowanie nowego użytkownika.
     */
    public registerUser(newUserData: CmsRegisterRequestDataModel): Observable<CmsRegisterResponseDataModel> {
        return this._http.post<CmsRegisterResponseDataModel>(
            this._endpoints.REGISTER_USER,
            newUserData,
        );
    };
}