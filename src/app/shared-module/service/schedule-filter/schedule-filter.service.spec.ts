/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RememberScheduleBarService } from '~/root-module/services/remember-schedule-bar/remember-schedule-bar.service';
import { SharedModule } from '~/shared-module/shared.module';
import { ScheduleCanvasService } from '../schedule-canvas/schedule-canvas.service';
import { ScheduleFilterService } from './schedule-filter.service';

describe('ScheduleFilterService', () => {
  let service: ScheduleFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [
        ScheduleCanvasService,
        RememberScheduleBarService,
        ScheduleFilterService,
      ],
    });
    service = TestBed.inject(ScheduleFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
