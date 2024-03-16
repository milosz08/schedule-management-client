/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { AddEditContentService } from './add-edit-content.service';

describe('AddEditContentService', () => {
  let service: AddEditContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [AddEditContentService],
    });
    service = TestBed.inject(AddEditContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
