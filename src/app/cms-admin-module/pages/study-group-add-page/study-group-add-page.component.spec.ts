import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsAdminModule } from '~/cms-admin-module/cms-admin.module';
import { StudyGroupAddPageComponent } from './study-group-add-page.component';

describe('StudyGroupAddPageComponent', () => {
  let component: StudyGroupAddPageComponent;
  let fixture: ComponentFixture<StudyGroupAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsAdminModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StudyGroupAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
