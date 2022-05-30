/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: single-schedule-entity-block.component.ts
 * Last modified | Ostatnia modyfikacja: 29/05/2022, 15:55
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

import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AvailableScheduleEntityTypes, ScheduleGroups } from '../../../../types/schedule-data.type';

import * as NgrxAction_MOD from '../../ngrx-store/modals-ngrx-store/modals.actions';
import { ModalsReducerType } from '../../ngrx-store/modals-ngrx-store/modals.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowaniu widoku pojedynczej aktywności na planie zajęć.
 */

@Component({
    selector: 'app-single-schedule-entity-block',
    templateUrl: './single-schedule-entity-block.component.html',
    styleUrls: [ './single-schedule-entity-block.component.scss' ],
})
export class SingleScheduleEntityBlockComponent {

    public _availableEntities: typeof AvailableScheduleEntityTypes = AvailableScheduleEntityTypes;

    @Input() public _activityData!: ScheduleGroups;
    @Input() public _addedPxFromTop: number = 0;
    @Input() public _entityType: string = 'groups';
    @Input() public _disableHrefEvents: boolean = false;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<ModalsReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public handleOpenDetailsModal(selectedSubjectId: number): void {
        this._store.dispatch(NgrxAction_MOD.__scheduleSubjectDetailsModalVisibility({ modalVisibility: true, selectedSubjectId }));
    };

    public eventBubblingDisableExecutingProparation(e: Event): void {
        e.stopPropagation();
    };
}