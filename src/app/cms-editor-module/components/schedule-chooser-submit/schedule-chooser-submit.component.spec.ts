import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { ScheduleActivityService } from '~/cms-editor-module/services/schedule-activity/schedule-activity.service';
import { ScheduleChooserSubmitComponent } from './schedule-chooser-submit.component';

describe('ScheduleChooserSubmitComponent', () => {
  let component: ScheduleChooserSubmitComponent;
  let fixture: ComponentFixture<ScheduleChooserSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
      providers: [ScheduleActivityService],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleChooserSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
