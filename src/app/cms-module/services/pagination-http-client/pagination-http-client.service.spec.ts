/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { PaginationHttpClientService } from './pagination-http-client.service';

describe('PaginationHttpClientService', () => {
  let service: PaginationHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [PaginationHttpClientService],
    });
    service = TestBed.inject(PaginationHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
