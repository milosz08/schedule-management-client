import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { ScheduleSubjectModalService } from './schedule-subject-modal.service';

describe('ScheduleSubjectModalService', () => {
  let service: ScheduleSubjectModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [ScheduleSubjectModalService],
    });
    service = TestBed.inject(ScheduleSubjectModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
