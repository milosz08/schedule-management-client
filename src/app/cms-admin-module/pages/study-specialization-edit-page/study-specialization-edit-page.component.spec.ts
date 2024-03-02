/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsAdminModule } from '~/cms-admin-module/cms-admin.module';
import { StudySpecializationEditPageComponent } from './study-specialization-edit-page.component';

describe('StudySpecializationEditPageComponent', () => {
  let component: StudySpecializationEditPageComponent;
  let fixture: ComponentFixture<StudySpecializationEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsAdminModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StudySpecializationEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
