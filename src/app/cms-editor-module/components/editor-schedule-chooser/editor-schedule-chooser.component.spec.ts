import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { ScheduleActivityService } from '~/cms-editor-module/services/schedule-activity/schedule-activity.service';
import { ScheduleSelectorService } from '~/cms-editor-module/services/schedule-selector/schedule-selector.service';
import { EditorScheduleChooserComponent } from './editor-schedule-chooser.component';

describe('EditorScheduleChooserComponent', () => {
  let component: EditorScheduleChooserComponent;
  let fixture: ComponentFixture<EditorScheduleChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
      providers: [ScheduleSelectorService, ScheduleActivityService],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorScheduleChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
