import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { AuthModule } from '~/auth-module/auth.module';
import { ResetPasswordService } from '~/auth-module/services/reset-password/reset-password.service';
import { SendTokenViaEmailPageComponent } from './send-token-via-email-page.component';

describe('SendTokenViaEmailPageComponent', () => {
  let component: SendTokenViaEmailPageComponent;
  let fixture: ComponentFixture<SendTokenViaEmailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [ResetPasswordService],
    }).compileComponents();

    fixture = TestBed.createComponent(SendTokenViaEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
