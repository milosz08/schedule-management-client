/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { ScheduleCanvasService } from '~/shared-module/service/schedule-canvas/schedule-canvas.service';
import { ScheduleFilterService } from '~/shared-module/service/schedule-filter/schedule-filter.service';
import { SharedModule } from '~/shared-module/shared.module';
import { ScheduleCanvasComponent } from './schedule-canvas.component';

describe('ScheduleCanvasComponent', () => {
  let component: ScheduleCanvasComponent;
  let fixture: ComponentFixture<ScheduleCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [ScheduleCanvasService, ScheduleFilterService],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
