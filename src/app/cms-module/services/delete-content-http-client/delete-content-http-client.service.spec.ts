/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { DeleteContentHttpClientService } from './delete-content-http-client.service';

describe('DeleteContentHttpClientService', () => {
  let service: DeleteContentHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [DeleteContentHttpClientService],
    });
    service = TestBed.inject(DeleteContentHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
