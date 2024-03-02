/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { ScheduleSubjectModalService } from '~/shared-module/service/schedule-subject-modal/schedule-subject-modal.service';
import { SharedModule } from '~/shared-module/shared.module';
import { ScheduleSubjectModalComponent } from './schedule-subject-modal.component';

describe('ScheduleSubjectModalComponent', () => {
  let component: ScheduleSubjectModalComponent;
  let fixture: ComponentFixture<ScheduleSubjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [ScheduleSubjectModalService],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleSubjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
