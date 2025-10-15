import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { AuthModule } from '~/auth-module/auth.module';
import { ResetPasswordMemoryService } from './reset-password-memory.service';

describe('ResetPasswordMemoryService', () => {
  let service: ResetPasswordMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [ResetPasswordMemoryService],
    });
    service = TestBed.inject(ResetPasswordMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
