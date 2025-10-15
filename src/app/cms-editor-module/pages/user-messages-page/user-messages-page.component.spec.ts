import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { UserMessagesPageComponent } from './user-messages-page.component';

describe('UserMessagesPageComponent', () => {
  let component: UserMessagesPageComponent;
  let fixture: ComponentFixture<UserMessagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
      providers: [PaginationService, DeleteContentService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMessagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
