import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { SearchFormInputComponent } from './search-form-input.component';

describe('SearchFormInputComponent', () => {
  let component: SearchFormInputComponent;
  let fixture: ComponentFixture<SearchFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [PaginationService],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
