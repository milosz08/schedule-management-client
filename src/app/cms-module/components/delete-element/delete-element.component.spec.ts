import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { DeleteElementComponent } from './delete-element.component';

describe('DeleteElementComponent', () => {
  let component: DeleteElementComponent;
  let fixture: ComponentFixture<DeleteElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [DeleteContentService],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
