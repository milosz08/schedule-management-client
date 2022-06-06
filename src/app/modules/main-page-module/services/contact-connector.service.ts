/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: contact-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 05/06/2022, 21:28
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

import { ExtendedContactFormModel } from '../models/contact-form.model';
import { AvailableDataModel, NameWithId } from '../../../models/drop-lists-data.model';
import { ResponseServerMessageModel } from '../../../models/response-server-message.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis udostępniający metody łączące się z backendem na stronie umożliwiającej wysłanie wiadomości do systemu.
 */

@Injectable()
export class ContactConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie wydziały i filtrująca je poprzez parametr wyszukiwania.
     */
    public getAllQueryDepartments(deptQuerySearch: string): Observable<AvailableDataModel<string>> {
        return this._http.get<AvailableDataModel<string>>(
            this._endpoints.GET_ALL_DEPARTMENTS_LIST,
            { params: { deptQuerySearch } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie grupy dziekańskie na podstawie nazwy wydziału.
     */
    public getAllQueryGroupsBaseDept(deptName: string): Observable<Array<NameWithId>> {
        return this._http.get<Array<NameWithId>>(
            this._endpoints.GET_ALL_GROUPS_BASE_DEPT,
            { params: { deptName } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca wszystkie typy wiadomości możliwe do wysłania.
     */
    public getAllQueryContactMessagIssueTypes(issueTypeName: string): Observable<AvailableDataModel<string>> {
        return this._http.get<AvailableDataModel<string>>(
            this._endpoints.GET_ALL_CONTACT_MESSAGE_ISSUE_TYPES,
            { params: { issueTypeName } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     *
     */
    public sendContactFormData(contactFormData: ExtendedContactFormModel): Observable<ResponseServerMessageModel> {
        return this._http.post<ResponseServerMessageModel>(
            this._endpoints.ADD_NEW_CONTACT_MESSAGE,
            contactFormData,
        );
    };
}