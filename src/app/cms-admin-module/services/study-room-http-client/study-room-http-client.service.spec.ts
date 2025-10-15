import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { StudyRoomHttpClientService } from './study-room-http-client.service';

describe('StudyRoomHttpClientService', () => {
  let service: StudyRoomHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [StudyRoomHttpClientService],
    });
    service = TestBed.inject(StudyRoomHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
