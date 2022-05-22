/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-second-level-tree-list.component.ts
 * Last modified | Ostatnia modyfikacja: 20/05/2022, 00:05
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

import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

import { delay, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GetConnectorService } from '../../services/get-connector.service';
import { ScheduleNavListModel } from '../../models/schedule-nav-list.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie 2 warstwy drzewa wyboru grup/pracowników/sal. Przyjmuję jedną metodę
 * delegującą przyjmującą jeden parametr zapytania.
 */

@Component({
    selector: 'app-schedule-second-level-tree-list',
    templateUrl: './schedule-second-level-tree-list.component.html',
    styleUrls: [],
    providers: [ GetConnectorService ],
})
export class ScheduleSecondLevelTreeListComponent {

    public _allElements: Array<ScheduleNavListModel> = new Array<ScheduleNavListModel>();
    private _unsubscribe: Subject<void> = new Subject();
    public _ifActive = false;

    public _suspenseLoadingActive: boolean = false;

    @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;

    @Input() public _firstLvlData?: ScheduleNavListModel;
    @Input() public _insertDataCallback!:
        (first: number, service: GetConnectorService) => Observable<Array<ScheduleNavListModel>>;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        public _serviceGET: GetConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public handleGetSecondLevelContent(): void {
        if (!this._ifActive) {
            this._suspenseLoadingActive = true;
            this._insertDataCallback(this._firstLvlData!.id, this._serviceGET)
                .pipe(
                    delay(400),
                    distinctUntilChanged(),
                    takeUntil(this._unsubscribe)
                ).subscribe(content => {
                    this._suspenseLoadingActive = false;
                    this._allElements = content;
                });
        } else {
            this._allElements = new Array<ScheduleNavListModel>();
        }
        this._ifActive = !this._ifActive;
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };
}