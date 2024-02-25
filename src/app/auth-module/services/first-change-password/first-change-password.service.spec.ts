/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { AuthModule } from '~/auth-module/auth.module';
import { FirstChangePasswordService } from './first-change-password.service';

describe('FirstChangePasswordService', () => {
  let service: FirstChangePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [FirstChangePasswordService],
    });
    service = TestBed.inject(FirstChangePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
