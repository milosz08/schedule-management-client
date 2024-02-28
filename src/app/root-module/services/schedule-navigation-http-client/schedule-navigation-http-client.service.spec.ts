/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { ScheduleNavigationHttpClientService } from './schedule-navigation-http-client.service';

describe('ScheduleNavigationHttpClientService', () => {
  let service: ScheduleNavigationHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
      providers: [ScheduleNavigationHttpClientService],
    });
    service = TestBed.inject(ScheduleNavigationHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
