/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-data-get-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 27/05/2022, 01:41
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
import { Params } from '@angular/router';

import { Observable, of } from 'rxjs';

import { ApiConfigurerHelper } from '../utils/api-configurer.helper';

import {
    ScheduleDataRes, ScheduleGroupQuery, ScheduleGroups, ScheduleRoomQuery, ScheduleRooms, ScheduleTeacherQuery,
    ScheduleTeachers,
} from '../types/schedule-data.type';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiedzialny za pobieranie sparametryzowanych zapytaniań do serwera o zawartość planu zajęć w zależności
 * od wybrania kategorii (grupa, nauczyciel, sala zajęciowa).
 */

@Injectable()
export class ScheduleDataGetConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Pobieranie danych planu zajęć na podstawie wybranej grupy dziekańskiej.
     */
    public getScheduleDataBaseGroup(query: ScheduleGroupQuery | Params): Observable<ScheduleDataRes<ScheduleGroups>> {
        return this._http.get<ScheduleDataRes<ScheduleGroups>>(
            this._endpoints.GET_SCHEDULE_SUBJECTS_BASE_GROUP_ID,
            { params: { ...query } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Pobieranie danych planu zajęć na podstawie wybranego nauczyciela.
     */
    public getScheduleDataBaseTeacher(query: ScheduleTeacherQuery | Params): Observable<ScheduleDataRes<ScheduleTeachers>> {
        return this._http.get<ScheduleDataRes<ScheduleTeachers>>(
            this._endpoints.GET_SCHEDULE_SUBJECTS_BASE_TEACHER_ID,
            { params: { ...query } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Pobieranie danych planu zajęć na podstawie wybranej sali zajęciowej.
     */
    public getScheduleDataBaseRoom(query: ScheduleRoomQuery | Params): Observable<ScheduleDataRes<ScheduleRooms>> {
        return this._http.get<ScheduleDataRes<ScheduleRooms>>(
            this._endpoints.GET_SCHEDULE_SUBJECTS_BASE_ROOM_ID,
            { params: { ...query } },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda pobierająca odpowiednio sale zajęciowe, pracowników albo grupy na podstawie przekazywanego parametru.
     */
    public getSheduleBaseType(type: string, queryParams: Params): Observable<any> {
        switch(type) {
            case 'rooms':
                return this.getScheduleDataBaseRoom(queryParams);
            case 'employeers':
                return this.getScheduleDataBaseTeacher(queryParams);
            case 'groups':
                return this.getScheduleDataBaseGroup(queryParams);
            default:
                return of(null);
        }
    };
}