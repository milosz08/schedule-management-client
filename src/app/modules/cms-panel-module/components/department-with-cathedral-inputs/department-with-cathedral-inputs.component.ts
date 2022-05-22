/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: department-with-cathedral-inputs.component.ts
 * Last modified | Ostatnia modyfikacja: 17/05/2022, 20:25
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

import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CmsGetConnectorService } from '../../services/cms-get-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent renderujący zawartość pola wyboru wydziału oraz katedry (posiada walidację, tj. katedrę można wybrać
 * dopiero po udanym wyborze wydziału). Przekazywany form angularowy powinien implementować pola tekstowe
 * "departmentName" oraz "cathedralName".
 */

@Component({
    selector: 'app-department-with-cathedral-inputs',
    templateUrl: './department-with-cathedral-inputs.component.html',
    styleUrls: [],
    providers: [ CmsGetConnectorService ],
})
export class DepartmentWithCathedralInputsComponent implements OnInit, OnChanges, OnDestroy {

    public _allDepartments: Array<string> = new Array<string>();
    public _allCathedrals: Array<string> = new Array<string>();
    public _cathedraVisible: boolean = false;

    @Input() public _angularForm?: FormGroup;
    @Output() public _emitNextLevel: EventEmitter<void> = new EventEmitter<void>();

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _serviceGET: CmsGetConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this.handleEmitDepartmentQuery('');
        this.handleEmitCathedralQuery('');
    };

    public ngOnChanges(changes: SimpleChanges): void {
        this._angularForm?.get('departmentName')?.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            this.handleEmitCathedralQuery('');
            this._angularForm?.get('cathedralName')?.patchValue('');
            this._cathedraVisible = false;
        });
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleShowCathedralInput(): void {
        this._cathedraVisible = true;
    };

    public handleShowNextLevelInput(): void  {
        this._emitNextLevel.emit();
    };

    public handleEmitDepartmentQuery(departmentName: string): void {
        this._serviceGET.getQueryDepartmentsList(departmentName)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(r => this._allDepartments = r.dataElements);
    };

    public handleEmitCathedralQuery(cathedralName: string): void {
        this._serviceGET
            .getQueryCathedralsBasedDeptList(cathedralName, this._angularForm?.get('departmentName')?.value)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(r => this._allCathedrals = r.dataElements);
    };
}