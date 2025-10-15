import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { SortingButtonComponent } from './sorting-button.component';

describe('SortingButtonComponent', () => {
  let component: SortingButtonComponent;
  let fixture: ComponentFixture<SortingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [PaginationService],
    }).compileComponents();

    fixture = TestBed.createComponent(SortingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
