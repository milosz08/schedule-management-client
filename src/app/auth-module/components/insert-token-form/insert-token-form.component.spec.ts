import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { AuthModule } from '~/auth-module/auth.module';
import { ResetPasswordService } from '~/auth-module/services/reset-password/reset-password.service';
import { InsertTokenFormComponent } from './insert-token-form.component';

describe('InsertTokenFormComponent', () => {
  let component: InsertTokenFormComponent;
  let fixture: ComponentFixture<InsertTokenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [ResetPasswordService],
    }).compileComponents();

    fixture = TestBed.createComponent(InsertTokenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
