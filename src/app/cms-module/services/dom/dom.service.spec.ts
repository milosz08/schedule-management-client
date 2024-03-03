/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { DomService } from './dom.service';

describe('DomService', () => {
  let service: DomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [DomService],
    });
    service = TestBed.inject(DomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
