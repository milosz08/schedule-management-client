import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { IdentityHttpClientService } from './identity-http-client.service';

describe('IdentityHttpClientService', () => {
  let service: IdentityHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [IdentityHttpClientService],
    });
    service = TestBed.inject(IdentityHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
