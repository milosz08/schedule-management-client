/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: templates.module.ts
 * Last modified | Ostatnia modyfikacja: 30/04/2022, 12:18
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { CheckboxTemplateComponent } from './components/checkbox-template/checkbox-template.component';
import { ComboBoxTemplateComponent } from './components/combo-box-template/combo-box-template.component';
import { TextInputPasswordComponent } from './components/text-input-password/text-input-password.component';
import { SelectListTemplateComponent } from './components/select-list-template/select-list-template.component';
import { SelectDropBoxTemplateComponent } from './components/select-drop-box-template/select-drop-box-template.component';

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        CheckboxTemplateComponent,
        TextInputPasswordComponent,
        SelectListTemplateComponent,
        SelectDropBoxTemplateComponent,
        ComboBoxTemplateComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        ReactiveFormsModule,
    ],
    providers: [],
    exports: [
        CheckboxTemplateComponent,
        TextInputPasswordComponent,
        SelectListTemplateComponent,
        SelectDropBoxTemplateComponent,
        ComboBoxTemplateComponent,
    ],
})
export class TemplatesModule {}