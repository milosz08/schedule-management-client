import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { LastOpenedSchedulesHttpClientService } from './last-opened-schedules-http-client.service';

describe('LastOpenedSchedulesHttpClientService', () => {
  let service: LastOpenedSchedulesHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
      providers: [LastOpenedSchedulesHttpClientService],
    });
    service = TestBed.inject(LastOpenedSchedulesHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
