import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [SnackbarService],
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
