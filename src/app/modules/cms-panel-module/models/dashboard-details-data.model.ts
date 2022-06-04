/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: dashboard-details-data.model.ts
 * Last modified | Ostatnia modyfikacja: 03/06/2022, 16:53
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

export interface DashboardDetailsDataModel {
    email: string;
    shortcut: string;
    city: string;
    nationality: string;
    departmentFullName: string;
    cathedralFullName: string;
    studySpecializations: Array<string>;
    studySubjects: Array<string>;
    dashboardElementsCount: DashboardElementsCount,
    dashboardUserTypesCount: DashboardUserTypesCount
}

//----------------------------------------------------------------------------------------------------------------------

interface DashboardElementsCount extends DashboardBaseCount {
    departmentsCount: number;
    cathedralsCount: number;
    studyRoomsCount: number;
    studySpecializationsCount: number;
    studySubjectsCount: number;
    studyGroupsCount: number;
}

//----------------------------------------------------------------------------------------------------------------------

interface DashboardUserTypesCount extends DashboardBaseCount {
    studentsCount: number;
    teachersCount: number;
    editorsCount: number;
    administratorsCount: number;
}

//----------------------------------------------------------------------------------------------------------------------

interface DashboardBaseCount {
    allElements: number;
}