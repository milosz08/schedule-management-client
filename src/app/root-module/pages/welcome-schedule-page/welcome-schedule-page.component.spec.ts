import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { WelcomeSchedulePageComponent } from './welcome-schedule-page.component';

describe('WelcomeSchedulePageComponent', () => {
  let component: WelcomeSchedulePageComponent;
  let fixture: ComponentFixture<WelcomeSchedulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
