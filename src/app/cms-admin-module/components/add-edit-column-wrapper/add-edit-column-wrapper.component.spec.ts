/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsAdminModule } from '~/cms-admin-module/cms-admin.module';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { AddEditColumnWrapperComponent } from './add-edit-column-wrapper.component';

describe('AddEditColumnWrapperComponent', () => {
  let component: AddEditColumnWrapperComponent;
  let fixture: ComponentFixture<AddEditColumnWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsAdminModule],
      providers: [AddEditContentService],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditColumnWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
