/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-schedule-activity-req.model.ts
 * Last modified | Ostatnia modyfikacja: 28/05/2022, 15:01
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

import { CmsScheduleConvertResDataModel } from '../../../models/cms-schedule-convert-data.model';

export class CmsScheduleActivityReqModel {
    public deptId: number;
    public studySpecId: number;
    public studyGroupId: number;
    public weekDayId: number;
    public subjectOrActivityName: string;
    public subjectTypeName: string;
    public subjectRooms: Array<number>;
    public subjectTeachers: Array<number>;
    public hourStart: string;
    public hourEnd: string;
    public weeksData: Array<string>;

    constructor(
        formData: CmsScheduleActivityFormModel, weekDayId: string | number, schedData: CmsScheduleConvertResDataModel,
    ) {
        this.deptId = schedData.deptData.id as number;
        this.studySpecId = schedData.studySpecData.id as number;
        this.studyGroupId = schedData.studyGroupData.id as number;
        this.weekDayId = weekDayId as number;
        this.subjectOrActivityName = formData.subjectOrActivityName;
        this.subjectTypeName = formData.subjectTypeName;
        this.subjectRooms = formData.subjectRooms;
        this.subjectTeachers = formData.subjectTeachers;
        this.hourStart = formData.hourStart;
        this.hourEnd = formData.hourEnd;
        this.weeksData = formData.weeksData;
    }
}

//----------------------------------------------------------------------------------------------------------------------

export interface CmsScheduleActivityFormModel {
    subjectOrActivityName: string;
    subjectTypeName: string;
    subjectRooms: Array<number>;
    subjectTeachers: Array<number>;
    hourStart: string;
    hourEnd: string;
    weeksData: Array<string>;
}