/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-schedule-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 24/05/2022, 21:28
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
import { CmsScheduleConvertReqDataModel, CmsScheduleConvertResDataModel } from '../models/cms-schedule-convert-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiedzialny za łącznie się z backendem do zarządzania encjami planu zajęć poszczególnych grup wydziałowych.
 */

@Injectable({
    providedIn: 'root',
})
export class CmsScheduleConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda konwertująca nazwy parametrów na id w bazie danych.
     */
    public convertScheduleParameters(req: CmsScheduleConvertReqDataModel): Observable<CmsScheduleConvertResDataModel> {
        return this._http.post<CmsScheduleConvertResDataModel>(
            this._endpoints.CONVERT_SCHEDULE_DATA_NAMES_TO_IDS,
            req,
        );
    };
}