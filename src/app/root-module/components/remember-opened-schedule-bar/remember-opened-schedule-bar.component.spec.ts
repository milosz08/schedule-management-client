import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { RememberScheduleBarService } from '~/root-module/services/remember-schedule-bar/remember-schedule-bar.service';
import { RememberOpenedScheduleBarComponent } from './remember-opened-schedule-bar.component';

describe('RememberOpenedScheduleBarComponent', () => {
  let component: RememberOpenedScheduleBarComponent;
  let fixture: ComponentFixture<RememberOpenedScheduleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
      providers: [RememberScheduleBarService],
    }).compileComponents();

    fixture = TestBed.createComponent(RememberOpenedScheduleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
