/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { ScheduleActivityService } from '~/cms-editor-module/services/schedule-activity/schedule-activity.service';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { ScheduleSubjectModalService } from '~/shared-module/service/schedule-subject-modal/schedule-subject-modal.service';
import { ScheduleEditorPageComponent } from './schedule-editor-page.component';

describe('ScheduleEditorPageComponent', () => {
  let component: ScheduleEditorPageComponent;
  let fixture: ComponentFixture<ScheduleEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
      providers: [
        ScheduleActivityService,
        DeleteContentService,
        ScheduleSubjectModalService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
