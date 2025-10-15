import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { ScheduleHttpClientService } from './schedule-http-client.service';

describe('ScheduleHttpClientService', () => {
  let service: ScheduleHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [ScheduleHttpClientService],
    });
    service = TestBed.inject(ScheduleHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
