import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { AuthModule } from '~/auth-module/auth.module';
import { SavedAccountsService } from './saved-accounts.service';

describe('SavedAccountsService', () => {
  let service: SavedAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [SavedAccountsService],
    });
    service = TestBed.inject(SavedAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
