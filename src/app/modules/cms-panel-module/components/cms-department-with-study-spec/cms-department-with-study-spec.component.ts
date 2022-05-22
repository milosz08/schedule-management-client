/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-department-with-study-spec.component.ts
 * Last modified | Ostatnia modyfikacja: 22/05/2022, 00:58
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

import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CmsGetConnectorService } from '../../services/cms-get-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie składowych formularza (możliwość wyboru wydziału oraz kierunku studiów).
 * Wybór drugiego elementu możliwy jest dopiero po poprawnym wybraniu elementu pierwszego.
 */

@Component({
    selector: 'app-cms-department-with-study-spec',
    templateUrl: './cms-department-with-study-spec.component.html',
    styleUrls: [],
    providers: [ CmsGetConnectorService ],
})
export class CmsDepartmentWithStudySpecComponent implements OnInit, OnChanges, OnDestroy {

    public _allDepartments: Array<string> = new Array<string>();
    public _allStudySpecs: Array<string> = new Array<string>();

    public _studySpecVisible: boolean = false;
    private _unsubscribe: Subject<void> = new Subject();

    @Input() public _angularForm?: FormGroup;
    @Input() public _labelId: string = '';

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _serviceGET: CmsGetConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this.handleEmitDepartmentQuery('');
        this.handleEmitStudySpecQuery('');
    };

    public ngOnChanges(changes: SimpleChanges): void {
        this._angularForm?.get('departmentName')?.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            this.handleEmitStudySpecQuery('');
            this._angularForm?.get('studySpecName')?.patchValue('');
            this._studySpecVisible = false;
        });
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleShowStudySpecInput(): void {
        this._studySpecVisible = true;
    };

    public handleEmitDepartmentQuery(queryValue: string): void {
        this._serviceGET.getQueryDepartmentsList(queryValue)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => this._allDepartments = q.dataElements);
    };

    public handleEmitStudySpecQuery(studySpecName: string): void {
        this._serviceGET
            .getQueryStudySpecsBasedDeptList(studySpecName, this._angularForm!.get('departmentName')!.value)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(r => this._allStudySpecs = r.dataElements);
    };
}