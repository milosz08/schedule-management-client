/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { ScheduleSelectorHttpClientService } from './schedule-selector-http-client.service';

describe('ScheduleSelectorHttpClientService', () => {
  let service: ScheduleSelectorHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
      providers: [ScheduleSelectorHttpClientService],
    });
    service = TestBed.inject(ScheduleSelectorHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
