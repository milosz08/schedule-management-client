/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { UserMessageService } from './user-message.service';

describe('UserMessageService', () => {
  let service: UserMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [UserMessageService],
    });
    service = TestBed.inject(UserMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
