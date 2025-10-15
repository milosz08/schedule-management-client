import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AppModule } from '~/app.module';
import { RememberScheduleBarService } from '~/root-module/services/remember-schedule-bar/remember-schedule-bar.service';
import { ScheduleCanvasService } from '~/shared-module/service/schedule-canvas/schedule-canvas.service';
import { ScheduleFilterService } from '~/shared-module/service/schedule-filter/schedule-filter.service';
import { SharedModule } from '~/shared-module/shared.module';
import {
  getCurrentStudyYear,
  getCurrentWeek,
} from '~/shared-module/utils/date.utils';
import { ScheduleNavFilterPanelComponent } from './schedule-nav-filter-panel.component';

describe('ScheduleNavFilterPanelComponent', () => {
  let component: ScheduleNavFilterPanelComponent;
  let fixture: ComponentFixture<ScheduleNavFilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [
        ScheduleCanvasService,
        RememberScheduleBarService,
        ScheduleFilterService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleNavFilterPanelComponent);
    component = fixture.componentInstance;

    component.filterForm = new FormGroup({
      selectedWeekData: new FormControl(getCurrentWeek()),
      selectedStudyYear: new FormControl(getCurrentStudyYear()),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
