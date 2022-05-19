/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: object-mapper.helper.ts
 * Last modified | Ostatnia modyfikacja: 18/05/2022, 04:19
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

import { MiscHelper } from './misc.helper';
import { UserIdentityType } from '../types/user-identity.type';

import { SelectListTupleModel } from '../modules/templates-module/models/select-list-tuple.model';
import { RoomDataModel, StudyDataModel } from '../modules/cms-panel-module/models/cms-drop-lists-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa przechowująca metody mapujące obiekty przy pomocy map i paradygramtu programowania funkcyjnego.
 */

@Injectable({
    providedIn: 'root'
})
export class ObjectMapperHelper {

    public __allRoles: Array<SelectListTupleModel> = Object.keys(UserIdentityType)
        .filter(r => r !== UserIdentityType.UNDEFINED)
        .map(r => ({ name: MiscHelper.createUserRoleAllPhrase(r as UserIdentityType).label, value: r }))
        .reverse();

    //------------------------------------------------------------------------------------------------------------------

    public __allRoomTypes(preMap: Array<RoomDataModel>): Array<SelectListTupleModel> {
        return preMap.map(t => ({ name: `${t.name} (${t.alias})`, value: t.alias }));
    };

    //------------------------------------------------------------------------------------------------------------------

    public __allStudyTypes(preMap: Array<StudyDataModel>): Array<SelectListTupleModel> {
        return preMap
            .map(type => ({ value: type.alias, name: `${type.name} (${type.alias})` }))
            .concat({ value: 'ALL', name: 'dodaj oba typy' });
    };
}