import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { StudyGroupHttpClientService } from './study-group-http-client.service';

describe('StudyGroupHttpClientService', () => {
  let service: StudyGroupHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [StudyGroupHttpClientService],
    });
    service = TestBed.inject(StudyGroupHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
