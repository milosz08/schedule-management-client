/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { ScheduleHttpClientService } from './schedule-http-client.service';

describe('ScheduleHttpClientService', () => {
  let service: ScheduleHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
      providers: [ScheduleHttpClientService],
    });
    service = TestBed.inject(ScheduleHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
