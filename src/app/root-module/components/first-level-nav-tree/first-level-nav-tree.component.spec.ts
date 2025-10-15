import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { ScheduleNavigationService } from '~/root-module/services/schedule-navigation/schedule-navigation.service';
import { FirstLevelNavTreeComponent } from './first-level-nav-tree.component';

describe('FirstLevelNavTreeComponent', () => {
  let component: FirstLevelNavTreeComponent;
  let fixture: ComponentFixture<FirstLevelNavTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
      providers: [ScheduleNavigationService],
    }).compileComponents();

    fixture = TestBed.createComponent(FirstLevelNavTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
