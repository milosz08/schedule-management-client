import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { ScheduleActivityService } from './schedule-activity.service';

describe('ScheduleActivityService', () => {
  let service: ScheduleActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
      providers: [ScheduleActivityService],
    });
    service = TestBed.inject(ScheduleActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
