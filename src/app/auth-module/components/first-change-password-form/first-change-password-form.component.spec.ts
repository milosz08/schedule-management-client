import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { AuthModule } from '~/auth-module/auth.module';
import { FirstChangePasswordService } from '~/auth-module/services/first-change-password/first-change-password.service';
import { FirstChangePasswordFormComponent } from './first-change-password-form.component';

describe('FirstChangePasswordFormComponent', () => {
  let component: FirstChangePasswordFormComponent;
  let fixture: ComponentFixture<FirstChangePasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [FirstChangePasswordService],
    }).compileComponents();

    fixture = TestBed.createComponent(FirstChangePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
