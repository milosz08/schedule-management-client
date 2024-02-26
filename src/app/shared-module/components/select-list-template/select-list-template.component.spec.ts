/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { SelectListTemplateComponent } from './select-list-template.component';

describe('SelectListTemplateComponent', () => {
  let component: SelectListTemplateComponent;
  let fixture: ComponentFixture<SelectListTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectListTemplateComponent);
    component = fixture.componentInstance;

    component.formControlId = 'test';
    component.formGroup = new FormGroup({
      test: new FormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
