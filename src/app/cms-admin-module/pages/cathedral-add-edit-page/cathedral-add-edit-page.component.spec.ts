import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsAdminModule } from '~/cms-admin-module/cms-admin.module';
import { AddEditContentService } from '~/cms-admin-module/services/add-edit-content/add-edit-content.service';
import { CathedralAddEditPageComponent } from './cathedral-add-edit-page.component';

describe('CathedralAddEditPageComponent', () => {
  let component: CathedralAddEditPageComponent;
  let fixture: ComponentFixture<CathedralAddEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsAdminModule],
      providers: [AddEditContentService],
    }).compileComponents();

    fixture = TestBed.createComponent(CathedralAddEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
