import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { IdentityService } from './identity.service';

describe('IdentityService', () => {
  let service: IdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [IdentityService],
    });
    service = TestBed.inject(IdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
