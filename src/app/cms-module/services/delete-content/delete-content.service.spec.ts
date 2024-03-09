/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { DeleteContentService } from './delete-content.service';

describe('DeleteContentService', () => {
  let service: DeleteContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [DeleteContentService],
    });
    service = TestBed.inject(DeleteContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
