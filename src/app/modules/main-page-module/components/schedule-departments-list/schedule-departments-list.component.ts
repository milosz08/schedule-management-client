/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-departments-list.component.ts
 * Last modified | Ostatnia modyfikacja: 19/05/2022, 21:28
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

import { Component, ContentChild, OnDestroy, TemplateRef } from '@angular/core';

import { delay, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GetConnectorService } from '../../services/get-connector.service';
import { ScheduleNavListModel } from '../../models/schedule-nav-list.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie wydziałów struktury drzewa nawigacji strony planu.
 */

@Component({
    selector: 'app-schedule-departments-list',
    templateUrl: './schedule-departments-list.component.html',
    styleUrls: [],
    providers: [ GetConnectorService ],
})
export class ScheduleDepartmentsListComponent implements OnDestroy {

    public _allDepartments: Array<ScheduleNavListModel> = new Array<ScheduleNavListModel>();
    private _unsubscribe: Subject<void> = new Subject();

    public _suspenseLoadingActive: boolean = true;

    @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _serviceGET: GetConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._serviceGET
            .getAllDepartments()
            .pipe(
                delay(400),
                distinctUntilChanged(),
                takeUntil(this._unsubscribe)
            ).subscribe(allDepartments => {
                this._suspenseLoadingActive = false;
                this._allDepartments = allDepartments;
            });
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };
}