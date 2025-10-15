import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { UserMessageService } from '~/cms-module/services/user-message/user-message.service';
import { UserMessageDetailsComponent } from './user-message-details.component';

describe('UserMessageDetailsComponent', () => {
  let component: UserMessageDetailsComponent;
  let fixture: ComponentFixture<UserMessageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [UserMessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
