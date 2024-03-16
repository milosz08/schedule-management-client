/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsAdminModule } from '~/cms-admin-module/cms-admin.module';
import { StudyRoomAddEditPageComponent } from './study-room-add-edit-page.component';

describe('StudyRoomAddEditPageComponent', () => {
  let component: StudyRoomAddEditPageComponent;
  let fixture: ComponentFixture<StudyRoomAddEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsAdminModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StudyRoomAddEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
