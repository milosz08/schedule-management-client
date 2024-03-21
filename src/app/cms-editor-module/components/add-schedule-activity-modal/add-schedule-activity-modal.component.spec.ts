/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { ScheduleActivityService } from '~/cms-editor-module/services/schedule-activity/schedule-activity.service';
import { AddScheduleActivityModalComponent } from './add-schedule-activity-modal.component';

describe('AddScheduleActivityModalComponent', () => {
  let component: AddScheduleActivityModalComponent;
  let fixture: ComponentFixture<AddScheduleActivityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
      providers: [ScheduleActivityService],
    }).compileComponents();

    fixture = TestBed.createComponent(AddScheduleActivityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
