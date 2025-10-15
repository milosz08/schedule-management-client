import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { UserMessageHttpClientService } from './user-message-http-client.service';

describe('UserMessageHttpClientService', () => {
  let service: UserMessageHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [UserMessageHttpClientService],
    });
    service = TestBed.inject(UserMessageHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
