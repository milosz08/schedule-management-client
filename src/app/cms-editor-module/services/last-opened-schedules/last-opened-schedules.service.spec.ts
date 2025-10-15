import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { LastOpenedSchedulesService } from './last-opened-schedules.service';

describe('LastOpenedSchedulesService', () => {
  let service: LastOpenedSchedulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
      providers: [LastOpenedSchedulesService],
    });
    service = TestBed.inject(LastOpenedSchedulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
