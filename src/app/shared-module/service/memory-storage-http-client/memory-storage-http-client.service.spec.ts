import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { MemoryStorageHttpClientService } from './memory-storage-http-client.service';

describe('MemoryStorageHttpClientService', () => {
  let service: MemoryStorageHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [MemoryStorageHttpClientService],
    });
    service = TestBed.inject(MemoryStorageHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
