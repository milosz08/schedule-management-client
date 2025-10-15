import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { DeletePageableElementsComponent } from './delete-pageable-elements.component';

describe('DeletePageableElementsComponent', () => {
  let component: DeletePageableElementsComponent;
  let fixture: ComponentFixture<DeletePageableElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [PaginationService, DeleteContentService],
    }).compileComponents();

    fixture = TestBed.createComponent(DeletePageableElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
