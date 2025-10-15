import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { RootMainPageComponent } from './root-main-page.component';

describe('RootMainPageComponent', () => {
  let component: RootMainPageComponent;
  let fixture: ComponentFixture<RootMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RootMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
