/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: selected-schedule-page.component.ts
 * Last modified | Ostatnia modyfikacja: 24/05/2022, 23:06
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

import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { catchError, delay, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MiscHelper } from '../../../../utils/misc.helper';
import { ScheduleDataRes, ScheduleGroups } from '../../../../types/schedule-data.type';

import { ScheduleDataGetConnectorService } from '../../../../services/schedule-data-get-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku wybranego planu zajęć na podsatwie parametrów ścieżki URL.
 */

@Component({
    selector: 'app-selected-schedule-page',
    templateUrl: './selected-schedule-page.component.html',
    styleUrls: [ './selected-schedule-page.component.scss' ],
    host: { class: 'app__main-flex-columned' },
    providers: [ ScheduleDataGetConnectorService ],
})
export class SelectedSchedulePageComponent implements AfterViewInit {

    public _serverError: string = '';
    public _tableLoading: boolean = true;

    public _scheduleType: string = '';
    public _scheduleData: ScheduleDataRes<ScheduleGroups> = new ScheduleDataRes<ScheduleGroups>();
    public _hoursData: Array<number> = MiscHelper._hoursTable;

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _route: ActivatedRoute,
        private _scheduleGET: ScheduleDataGetConnectorService,
    ) {
        this._route.params.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            this._scheduleType = String(this._route.snapshot.paramMap.get('scheduleType'));
        });
        this._route.queryParams.pipe(
            takeUntil(this._unsubscribe),
            delay(200),
        ).subscribe(() => {
            if (![ 'groups', 'employeers', 'rooms' ].includes(this._scheduleType)) {
                this._serverError = 'Skontaktuj się z administratorem systemu';
            } else {
                this._serverError = '';
                this.loadTableContent(this._route.snapshot.queryParams);
            }
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    private loadTableContent(paramsToNumbers: { [key: string]: string  }): void {
        const params = JSON.parse(JSON.stringify(paramsToNumbers));
        Object.keys(params).forEach(key => params[key] = parseInt(params[key]));
        this._tableLoading = true;
        this._scheduleGET.getSheduleBaseType(this._scheduleType, params)
            .pipe(
                delay(400),
                takeUntil(this._unsubscribe),
                catchError(({ error }) => {
                    this._tableLoading = false;
                    if (error) {
                        this._serverError = error.message;
                    } else {
                        this._serverError = 'Skontaktuj się z administratorem systemu';
                    }
                    return of(null);
                })
            )
            .subscribe(data => {
                this._tableLoading = false;
                this._scheduleData = data;
            });
    };

    ngAfterViewInit(): void {
        // const element = document.querySelectorAll('.schedule-main-canvas__days-container')[0];
        // const spanElement = document.createElement('span');
        // spanElement.style.position = 'absolute';
        // spanElement.style.top = '200px';
        // spanElement.style.width = '100%';
        // spanElement.style.height = '60px';
        // spanElement.style.borderRadius = '5px';
        // spanElement.style.backgroundColor = 'rgb(121, 249, 209)';
        //
        // const spandwaelement = document.createElement('span');
        // spandwaelement.style.position = 'absolute';
        // spandwaelement.style.top = '270px';
        // spandwaelement.style.width = '100%';
        // spandwaelement.style.height = '60px';
        // spandwaelement.style.borderRadius = '5px';
        // spandwaelement.style.backgroundColor = 'rgb(239, 131, 221)';

        //console.log(elements);
    }
}