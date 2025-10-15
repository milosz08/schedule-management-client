import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { ContactHttpClientService } from './contact-http-client.service';

describe('ContactHttpClientService', () => {
  let service: ContactHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
      providers: [ContactHttpClientService],
    });
    service = TestBed.inject(ContactHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
