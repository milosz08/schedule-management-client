/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-data.type.ts
 * Last modified | Ostatnia modyfikacja: 27/05/2022, 01:11
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

import { NameWithId } from '../modules/cms-panel-module/models/cms-drop-lists-data.model';

//----------------------------------------------------------------------------------------------------------------------

export class ScheduleDataRes<T> {
    public traceDetails: Array<string> = new Array<string>();
    public scheduleHeaderData: string = '';
    public currentChooseWeek: string = '';
    public scheduleCanvasData: Array<ScheduleCanvasData<T>> = new Array<ScheduleCanvasData<T>>();
}

export interface ScheduleCanvasData<T> {
    weekdayNameWithId: NameWithId;
    weekdayDateTime: string;
    ifNotShowingOccuredDates: boolean;
    weekdayData: Array<T>;
}

//----------------------------------------------------------------------------------------------------------------------

export interface ScheduleGroups extends BaseScheduleData {
    teachersAliases: Array<ScheduleMultipleValues<ScheduleTeacherQuery>>;
    roomsAliases: Array<ScheduleMultipleValues<ScheduleRoomQuery>>;
}

export interface ScheduleTeachers extends BaseScheduleData {
    studyGroupAliases: Array<ScheduleMultipleValues<ScheduleGroupQuery>>;
    roomsAliases: Array<ScheduleMultipleValues<ScheduleRoomQuery>>;
}

export interface ScheduleRooms extends BaseScheduleData {
    studyGroupAliases: Array<ScheduleMultipleValues<ScheduleGroupQuery>>;
    teachersAliases: Array<ScheduleMultipleValues<ScheduleTeacherQuery>>;
}

export interface BaseScheduleData {
    scheduleSubjectId: number;
    subjectWithTypeAlias: string;
    subjectTypeHexColor: string;
    subjectTime: string;
    positionFromTop: number;
    elementHeight: number;
    subjectOccuredData: string;
    ifNotShowingOccuredDates: boolean;
}

//----------------------------------------------------------------------------------------------------------------------

export interface ScheduleMultipleValues<T> {
    alias: string;
    pathValues: T,
}

//----------------------------------------------------------------------------------------------------------------------

export class ScheduleGroupQuery {
    public deptId: number;
    public specId: number;
    public groupId: number;

    public constructor(deptId: number, specId: number, groupId: number) {
        this.deptId = deptId;
        this.specId = specId;
        this.groupId = groupId;
    };
}

export class ScheduleTeacherQuery {
    public deptId: number;
    public cathId: number;
    public employeerId: number;

    public constructor(deptId: number, cathId: number, employeerId: number) {
        this.deptId = deptId;
        this.cathId = cathId;
        this.employeerId = employeerId;
    };
}

export class ScheduleRoomQuery {
    public deptId: number;
    public cathId: number;
    public roomId: number;

    public constructor(deptId: number, cathId: number, roomId: number) {
        this.deptId = deptId;
        this.cathId = cathId;
        this.roomId = roomId;
    };
}

//----------------------------------------------------------------------------------------------------------------------

export enum AvailableScheduleEntityTypes {
    GROUPS = 'groups',
    EMPLOYEERS = 'employeers',
    ROOMS = 'rooms',
}

//----------------------------------------------------------------------------------------------------------------------

export interface ScheduleSubjectDetailsRes {
    subjectName: string;
    subjectTypeColor: string;
    subjectHours: string;
    teachers: string;
    typeAndRoomsName: string;
    departmentName: string;
    subjectOccur: string;
}

//----------------------------------------------------------------------------------------------------------------------

export class ScheduleFilteringData {
    public selectedYears: string;
    public weekInputOptions: string;

    public constructor(weekInputOptions: string, selectedYears: string) {
        this.weekInputOptions = weekInputOptions;
        this.selectedYears = selectedYears;
    }
}