import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { SuspenseLoaderService } from './suspense-loader.service';

describe('SuspenseLoaderService', () => {
  let service: SuspenseLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [SuspenseLoaderService],
    });
    service = TestBed.inject(SuspenseLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
