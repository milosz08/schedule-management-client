import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { UserImageComponent } from './user-image.component';

describe('UserImageComponent', () => {
  let component: UserImageComponent;
  let fixture: ComponentFixture<UserImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
