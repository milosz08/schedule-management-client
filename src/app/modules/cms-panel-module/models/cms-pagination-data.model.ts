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

export interface CmsPaginationDataModel<T> {
    elements: Array<T>;
    totalPagesCount: number;
    elementsFrom: number;
    elementsTo: number;
    totalElementsCount: number;
    currentActivePages: CurrentActivePages;
}

export interface CurrentActivePages {
    activePages: Array<number>;
    minEnabled: boolean;
    maxEnabled: boolean;
}

//----------------------------------------------------------------------------------------------------------------------

export interface CmsSingleUserDataModel {
    id: number;
    ifRemovable: boolean;
    nameWithSurname: string;
    login: string;
    role: UserIdentityType;
}

//----------------------------------------------------------------------------------------------------------------------

export interface CmsSingleDeptDataModel {
    id: number;
    ifRemovable: boolean;
    name: string;
    alias: string;
}

//----------------------------------------------------------------------------------------------------------------------

export interface CmsSingleCathDataModel {
    id: number;
    ifRemovable: boolean;
    name: string;
    alias: string;
    departmentName: string;
    departmentAlias: string;
}

//----------------------------------------------------------------------------------------------------------------------

export interface CmsSingleRoomTypeDataModel {
    id: number;
    name: string;
    description: string;
    capacity: number;
    departmentName: string;
    departmentAlias: string;
    cathedralName: string;
    cathedralAlias: string;
    roomTypeName: string;
    roomTypeAlias: string;
}

//----------------------------------------------------------------------------------------------------------------------

export interface CmsSingleStudySpecDataModel {
    id: number;
    name: string;
    specTypeName: string;
    specTypeAlias: string;
    departmentName: string;
    departmentAlias: string;
}

//----------------------------------------------------------------------------------------------------------------------

export interface CmsSingleStudySubjectDataModel {
    id: number;
    name: string;
    specName: string;
    specAlias: string;
    departmentName: string;
    departmentAlias: string;
}