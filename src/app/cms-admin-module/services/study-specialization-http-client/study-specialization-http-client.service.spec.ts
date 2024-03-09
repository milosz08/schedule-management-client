/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { StudySpecializationHttpClientService } from './study-specialization-http-client.service';

describe('StudySpecializationHttpClientService', () => {
  let service: StudySpecializationHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [StudySpecializationHttpClientService],
    });
    service = TestBed.inject(StudySpecializationHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
