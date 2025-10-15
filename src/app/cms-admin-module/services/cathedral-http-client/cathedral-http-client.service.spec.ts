import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { CathedralHttpClientService } from './cathedral-http-client.service';

describe('CathedralHttpClientService', () => {
  let service: CathedralHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [CathedralHttpClientService],
    });
    service = TestBed.inject(CathedralHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
