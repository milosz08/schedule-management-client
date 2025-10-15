import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsAdminModule } from '~/cms-admin-module/cms-admin.module';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { StudySpecializationsPageComponent } from './study-specializations-page.component';

describe('StudySpecializationsPageComponent', () => {
  let component: StudySpecializationsPageComponent;
  let fixture: ComponentFixture<StudySpecializationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsAdminModule],
      providers: [PaginationService, DeleteContentService],
    }).compileComponents();

    fixture = TestBed.createComponent(StudySpecializationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
