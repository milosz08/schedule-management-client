import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { AuthModule } from '~/auth-module/auth.module';
import { ResetPasswordService } from '~/auth-module/services/reset-password/reset-password.service';
import { SendTokenViaEmailFormComponent } from './send-token-via-email-form.component';

describe('SendTokenViaEmailFormComponent', () => {
  let component: SendTokenViaEmailFormComponent;
  let fixture: ComponentFixture<SendTokenViaEmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [ResetPasswordService],
    }).compileComponents();

    fixture = TestBed.createComponent(SendTokenViaEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
