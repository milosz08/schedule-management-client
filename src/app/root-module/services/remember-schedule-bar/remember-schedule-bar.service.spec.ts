import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { RememberScheduleBarService } from './remember-schedule-bar.service';

describe('RememberScheduleBarService', () => {
  let service: RememberScheduleBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
      providers: [RememberScheduleBarService],
    });
    service = TestBed.inject(RememberScheduleBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
