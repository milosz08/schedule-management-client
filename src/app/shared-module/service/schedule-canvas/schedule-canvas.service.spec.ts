/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RememberScheduleBarService } from '~/root-module/services/remember-schedule-bar/remember-schedule-bar.service';
import { SharedModule } from '~/shared-module/shared.module';
import { ScheduleCanvasService } from './schedule-canvas.service';

describe('ScheduleCanvasService', () => {
  let service: ScheduleCanvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [RememberScheduleBarService, ScheduleCanvasService],
    });
    service = TestBed.inject(ScheduleCanvasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
