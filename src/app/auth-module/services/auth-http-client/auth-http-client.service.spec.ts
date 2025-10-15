import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { AuthModule } from '~/auth-module/auth.module';
import { AuthHttpClientService } from './auth-http-client.service';

describe('AuthHttpClientService', () => {
  let service: AuthHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [AuthHttpClientService],
    });
    service = TestBed.inject(AuthHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
