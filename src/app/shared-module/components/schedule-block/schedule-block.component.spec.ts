import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { ScheduleSubjectModalService } from '~/shared-module/service/schedule-subject-modal/schedule-subject-modal.service';
import { SharedModule } from '~/shared-module/shared.module';
import { ScheduleBlockComponent } from './schedule-block.component';

describe('ScheduleBlockComponent', () => {
  let component: ScheduleBlockComponent;
  let fixture: ComponentFixture<ScheduleBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [ScheduleSubjectModalService],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
