/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-single-for-put-data.model.ts
 * Last modified | Ostatnia modyfikacja: 04/06/2022, 12:45
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

export interface DepartmentBaseIdModel {
    name: string;
    alias: string;
}

//----------------------------------------------------------------------------------------------------------------------

export interface CathedralBaseIdModel {
    name: string;
    alias: string;
    departmentName: string;
}

//----------------------------------------------------------------------------------------------------------------------

export interface StudyRoomBaseIdModel {
    name: string;
    alias: string;
    departmentName: string;
    cathedralName: string;
    capacity: number;
    roomTypeName: string;
}

//----------------------------------------------------------------------------------------------------------------------

export interface StudySpecializationBaseIdModel {
    name: string;
    alias: string;
    departmentName: string;
    studyType: Array<number>;
    studyDegree: Array<number>;
}

//----------------------------------------------------------------------------------------------------------------------

export interface StudySubjectBaseIdModel {
    name: string;
    departmentName: string;
    studySpecName: string;
}

//----------------------------------------------------------------------------------------------------------------------

export interface UserDetailsBaseIdModel {
    name: string;
    surname: string;
    city: string;
    nationality: string;
    role: string;
    departmentName: string;
    cathedralName: string;
    studySpecsOrSubjects: Array<number>;
}