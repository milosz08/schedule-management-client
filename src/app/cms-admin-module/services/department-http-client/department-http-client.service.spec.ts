import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { DepartmentHttpClientService } from './department-http-client.service';

describe('DepartmentHttpClientService', () => {
  let service: DepartmentHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [DepartmentHttpClientService],
    });
    service = TestBed.inject(DepartmentHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
