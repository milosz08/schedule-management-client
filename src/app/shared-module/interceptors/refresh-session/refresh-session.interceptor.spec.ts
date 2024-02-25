/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RefreshSessionInterceptor } from './refresh-session.interceptor';

describe('RefreshSessionInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [RefreshSessionInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: RefreshSessionInterceptor = TestBed.inject(
      RefreshSessionInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
