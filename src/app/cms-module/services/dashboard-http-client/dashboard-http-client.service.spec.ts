import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { DashboardHttpClientService } from './dashboard-http-client.service';

describe('DashboardHttpClientService', () => {
  let service: DashboardHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [DashboardHttpClientService],
    });
    service = TestBed.inject(DashboardHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
