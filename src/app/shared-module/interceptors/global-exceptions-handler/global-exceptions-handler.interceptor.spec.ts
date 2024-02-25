/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { GlobalExceptionHandlerInterceptor } from './global-exceptions-handler.interceptor';

describe('GlobalExceptionHandlerInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [GlobalExceptionHandlerInterceptor],
      imports: [AppModule],
    })
  );

  it('should be created', () => {
    const interceptor: GlobalExceptionHandlerInterceptor = TestBed.inject(
      GlobalExceptionHandlerInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
