import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { StudySubjectHttpClientService } from './study-subject-http-client.service';

describe('StudySubjectHttpClientService', () => {
  let service: StudySubjectHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [StudySubjectHttpClientService],
    });
    service = TestBed.inject(StudySubjectHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
