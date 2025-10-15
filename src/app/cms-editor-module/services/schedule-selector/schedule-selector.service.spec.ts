import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { ScheduleSelectorService } from './schedule-selector.service';

describe('ScheduleSelectorService', () => {
  let service: ScheduleSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
      providers: [ScheduleSelectorService],
    });
    service = TestBed.inject(ScheduleSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
