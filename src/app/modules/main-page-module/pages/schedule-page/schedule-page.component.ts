/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-page.component.ts
 * Last modified | Ostatnia modyfikacja: 09/04/2022, 17:15
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

import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ScheduleNavListModel } from '../../models/schedule-nav-list.model';
import { ScheduleNavLinksType } from '../../../../types/schedule-nav-links.type';
import { AllMainWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

import * as NgrxAction_SHA from '../../../shared-module/ngrx-store/shared-ngrx-store/shared.actions';
import { SharedReducerType } from '../../../shared-module/ngrx-store/shared-ngrx-store/shared.selectors';

import { GetConnectorService } from '../../services/get-connector.service';

//----------------------------------------------------------------------------------------------------------------------

type ObservableTuple = Observable<Array<ScheduleNavListModel>>;

//----------------------------------------------------------------------------------------------------------------------

/**
 * Widok odpowiadający za generowanie strony umożliwiającej przeglądanie planu.
 */

@Component({
    selector: 'app-root-schedule-page',
    templateUrl: './schedule-page.component.html',
    styleUrls: [ './schedule-page.component.scss' ],
})
export class SchedulePageComponent extends MetaWebContentHelper {

    public readonly _buttons: string[] = Object.keys(ScheduleNavLinksType);

    public _navElms: typeof ScheduleNavLinksType = ScheduleNavLinksType;
    public _navChoose: ScheduleNavLinksType = ScheduleNavLinksType.GROUPS;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        titleService: Title,
        metaService: Meta,
        private _store: Store<SharedReducerType>,
    ) {
        super(titleService, metaService, AllMainWebpages.SCHEDULE);
        this._store.dispatch(NgrxAction_SHA.__initialLoadScheduleData());
    };

    //------------------------------------------------------------------------------------------------------------------

    public insertCathedralsData(deptId: number, service: GetConnectorService): ObservableTuple {
        return service.getAllCathedrals(deptId);
    };

    public insertStudyRoomsData(deptId: number, cathId: number, service: GetConnectorService): ObservableTuple {
        return service.getAllStudyRooms(deptId, cathId);
    };

    public insertEmployeersData(deptId: number, cathId: number, service: GetConnectorService): ObservableTuple {
        return service.getAllEmployeers(deptId, cathId);
    };

    public insertStudyDegrees(deptId: number, service: GetConnectorService): ObservableTuple {
        return service.getAllDegreesBaseStudySpecs(deptId);
    };

    public insertStudySpecializationsData(deptId: number, degreeId: number, service: GetConnectorService): ObservableTuple {
        return service.getAllStudySpecs(deptId, degreeId);
    };

    public insertStudySemesters(deptId: number, studySpecId: number, service: GetConnectorService): ObservableTuple {
        return service.getAllSemesterBaseStudyGroup(deptId, studySpecId);
    };

    public insertStudyGroups(studySpecId: number, semId: number, service: GetConnectorService): ObservableTuple {
        return service.getAllGroupsBaseStudySpecAndSem(studySpecId, semId);
    };

    public handleToggleActiveSection(section: string) {
        this._navChoose = ScheduleNavLinksType[section];
    };

    public _ifChooseElementActive(element: string): string {
        return `left-bar__single-link-button
                ${this._navChoose === ScheduleNavLinksType[element] ? 'single-link-button--active' : ''}`;
    };
}