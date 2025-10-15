import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { LastOpenedSchedulesService } from '~/cms-editor-module/services/last-opened-schedules/last-opened-schedules.service';
import { LastOpenedSchedulesComponent } from './last-opened-schedules.component';

describe('LastOpenedSchedulesComponent', () => {
  let component: LastOpenedSchedulesComponent;
  let fixture: ComponentFixture<LastOpenedSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
      providers: [LastOpenedSchedulesService],
    }).compileComponents();

    fixture = TestBed.createComponent(LastOpenedSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
