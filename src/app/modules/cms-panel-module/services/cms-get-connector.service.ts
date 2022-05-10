/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-get-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 09/05/2022, 16:22
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

import { map, Observable } from 'rxjs';

import { ApiConfigurerHelper } from '../../../utils/api-configurer.helper';
import { CmsPaginationDataModel } from '../models/cms-pagination-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa serwisu służąca do pobierania danych z encji bazy danych dla systemu zarządzania treścią (łączenie się
 * do bazy danych).
 */

@Injectable()
export class CmsGetConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkich użytkowników z bazy danych (parametryzacja zapytania,
     * paginacja i dynamiczne filtrowanie).
     */
    public getAllUsers(params: any): Observable<CmsPaginationDataModel> {
        return this._http.get<CmsPaginationDataModel>(
            this._endpoints.CMS_FILTERED_ALL_USERS,
            { params },
        ).pipe(
            map(data => {
                return data;
            }),
        );
    };
}