/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsAdminModule } from '~/cms-admin-module/cms-admin.module';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { DepartmentAddEditPageComponent } from './department-add-edit-page.component';

describe('DepartmentAddEditPageComponent', () => {
  let component: DepartmentAddEditPageComponent;
  let fixture: ComponentFixture<DepartmentAddEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsAdminModule],
      providers: [AddEditContentService],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentAddEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
