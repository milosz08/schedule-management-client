import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { AuthModule } from '~/auth-module/auth.module';
import { UserProfileImageComponent } from './user-profile-image.component';

describe('UserProfileImageComponent', () => {
  let component: UserProfileImageComponent;
  let fixture: ComponentFixture<UserProfileImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
