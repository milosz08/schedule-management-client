import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsAdminModule } from '~/cms-admin-module/cms-admin.module';
import { DeptWithCathComponent } from './dept-with-cath.component';

describe('DeptWithCathComponent', () => {
  let component: DeptWithCathComponent;
  let fixture: ComponentFixture<DeptWithCathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsAdminModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DeptWithCathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
