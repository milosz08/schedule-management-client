import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { AddEditSectionHeaderComponent } from './add-edit-section-header.component';

describe('AddEditSectionHeaderComponent', () => {
  let component: AddEditSectionHeaderComponent;
  let fixture: ComponentFixture<AddEditSectionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
