/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: contact-form-elements.component.ts
 * Last modified | Ostatnia modyfikacja: 06/06/2022, 00:00
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

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MiscHelper } from '../../../../utils/misc.helper';
import { NameWithId } from '../../../../models/drop-lists-data.model';

import { ContactConnectorService } from '../../services/contact-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie elementów wspólnych formularzy umożliwiających wysłanie wiadomości
 * (zarówno tych anonimowych jak i spersonalizowanych).
 */

@Component({
    selector: 'app-contact-form-elements',
    templateUrl: './contact-form-elements.component.html',
    styleUrls: [],
    providers: [ ContactConnectorService ],
})
export class ContactFormElementsComponent implements OnInit, OnDestroy {

    public _allDepartments: Array<string> = new Array<string>();
    public _allMessageTypes: Array<string> = new Array<string>();
    public _allGroups: Array<NameWithId> = new Array<NameWithId>();

    public readonly _checkError = (name: string) => MiscHelper.checkNgFormError(this._formData, name);

    public _ifScheduleIssueVisible: boolean = false;

    @Input() public _formData!: FormGroup;
    @Input() public _ifServerError: boolean = false;
    @Input() public _serverMessage: string = '';
    @Input() public _isSeding: boolean = false;

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _queryConnectorGET: ContactConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this.handleEmitQueryAfterSetType('');
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleEmitDepartmentQuery(query: string): void {
        this._queryConnectorGET.getAllQueryDepartments(query).pipe(
            takeUntil(this._unsubscribe)
        ).subscribe(depts => this._allDepartments = depts.dataElements);
    };

    public handleChooseDepartment(): void {
        this._queryConnectorGET.getAllQueryGroupsBaseDept(this._formData.get('departmentName')?.value).pipe(
            takeUntil(this._unsubscribe)
        ).subscribe(groups => this._allGroups = groups);
    };

    public handleEmitQueryAfterSetType(query: string): void {
        this._queryConnectorGET.getAllQueryContactMessagIssueTypes(query).pipe(
            takeUntil(this._unsubscribe)
        ).subscribe(issueTypes => this._allMessageTypes = issueTypes.dataElements);
    };

    public handleChooseBookingType(): void {
        this._ifScheduleIssueVisible = this._formData.get('issueType')?.value === 'nieprawidłowe dane w planie';
        if (this._ifScheduleIssueVisible) {
            this.handleEmitDepartmentQuery('');
        }
    };
}