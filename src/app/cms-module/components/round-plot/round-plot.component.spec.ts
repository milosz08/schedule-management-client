import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { RoundPlotComponent } from './round-plot.component';

describe('RoundPlotComponent', () => {
  let component: RoundPlotComponent;
  let fixture: ComponentFixture<RoundPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RoundPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
