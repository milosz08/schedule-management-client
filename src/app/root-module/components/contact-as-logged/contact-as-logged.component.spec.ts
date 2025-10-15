import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { ContactService } from '~/root-module/services/contact/contact.service';
import { ContactAsLoggedComponent } from './contact-as-logged.component';

describe('ContactAsLoggedComponent', () => {
  let component: ContactAsLoggedComponent;
  let fixture: ComponentFixture<ContactAsLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
      providers: [ContactService],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactAsLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
