import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { LogoutModalComponent } from './logout-modal.component';

describe('LogoutModalComponent', () => {
  let component: LogoutModalComponent;
  let fixture: ComponentFixture<LogoutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
