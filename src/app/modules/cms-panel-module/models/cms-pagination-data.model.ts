/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-pagination-data.model.ts
 * Last modified | Ostatnia modyfikacja: 09/05/2022, 16:31
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

import { UserIdentityType } from '../../../types/user-identity.type';

//----------------------------------------------------------------------------------------------------------------------

export interface CmsPaginationDataModel {
    elements: Array<CmsSingleUserDataModel>;
    totalPagesCount: number;
    elementsFrom: number;
    elementsTo: number;
    totalElementsCount: number;
    currentActivePages: CurrentActivePages;
}

//----------------------------------------------------------------------------------------------------------------------

export interface CurrentActivePages {
    activePages: Array<number>;
    minEnabled: boolean;
    maxEnabled: boolean;
}

//----------------------------------------------------------------------------------------------------------------------

export class CmsSingleUserDataModel {

    public id: number;
    public nameWithSurname: string;
    public login: string;
    public role: UserIdentityType;
    public ifRemovable: boolean;

    public constructor(id: number, nameWithSurname: string, login: string, role: string, ifRemovable: boolean) {
        this.id = id;
        this.nameWithSurname = nameWithSurname;
        this.login = login;
        this.role = UserIdentityType[role];
        this.ifRemovable = ifRemovable;
    }
}