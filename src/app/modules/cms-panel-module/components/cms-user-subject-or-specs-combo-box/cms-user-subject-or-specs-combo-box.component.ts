/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-user-subject-or-specs-combo-box.component.ts
 * Last modified | Ostatnia modyfikacja: 20/05/2022, 11:35
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

import { NameWithId } from '../../models/cms-drop-lists-data.model';
import { UserIdentityType } from '../../../../types/user-identity.type';
import { CmsGetConnectorService } from '../../services/cms-get-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za generowanie combo-boxów z możliwością wyboru przedmiotów lub kierunków studiów. Wybranie
 * drugiej opcji możliwe jest tylko wtedy, gdy pierwsza opcja jest poprawna.
 */

@Component({
    selector: 'app-cms-user-subject-or-specs-combo-box',
    templateUrl: './cms-user-subject-or-specs-combo-box.component.html',
    styleUrls: [],
    providers: [ CmsGetConnectorService ],
})
export class CmsUserSubjectOrSpecsComboBoxComponent implements OnInit, OnDestroy, OnChanges {

    public _allSubjects: Array<NameWithId> = new Array<NameWithId>();
    public _allStudySpecs: Array<NameWithId> = new Array<NameWithId>();
    public _allDepartments: Array<string> = new Array<string>();

    public _allRoles: typeof UserIdentityType = UserIdentityType;
    public _currentRole: UserIdentityType = UserIdentityType.UNDEFINED;

    public _studySpecsVisible: boolean = false;
    public _studySubjectsVisible: boolean = false;

    @Input() public _angularForm?: FormGroup;

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _serviceGET: CmsGetConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this.handleEmitDepartmentQuery('');
    };

    public ngOnChanges(changes: SimpleChanges): void {
        this._angularForm!.get('role')!.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(role => {
            this._angularForm?.get('departmentName')?.patchValue('');
            this._currentRole = role;
        });
        this._angularForm!.get('departmentName')?.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            if (this._currentRole === UserIdentityType.STUDENT) {

                this._angularForm?.get('studySpecsOrSubjects')?.patchValue([]);
            }
        });
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleEmitDepartmentQuery(departmentName: string): void {
        this._serviceGET.getQueryDepartmentsList(departmentName)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(r => this._allDepartments = r.dataElements);
    };

    public handleShowStudySpecsInput(): void {
        this._studySpecsVisible = true;
        this._serviceGET
            .getAllAvilableStudySpecsBasedDept(this._angularForm!.get('departmentName')?.value)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(r => this._allStudySpecs = r.dataElements);
    };

    public handleShowStudySubjects(): void {
        this._studySubjectsVisible = true;
        this._serviceGET
            .getAllAvilableSubjectsBasedDept(this._angularForm!.get('departmentName')?.value)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(r => this._allSubjects = r.dataElements);
    };
}