/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { UserHttpClientService } from './user-http-client.service';

describe('UserHttpClientService', () => {
  let service: UserHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [UserHttpClientService],
    });
    service = TestBed.inject(UserHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
