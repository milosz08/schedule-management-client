/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { ScheduleSelectPageComponent } from './schedule-select-page.component';

describe('ScheduleSelectPageComponent', () => {
  let component: ScheduleSelectPageComponent;
  let fixture: ComponentFixture<ScheduleSelectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleSelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
