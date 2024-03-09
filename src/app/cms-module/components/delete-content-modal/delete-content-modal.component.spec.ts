/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { DeleteContentModalComponent } from './delete-content-modal.component';

describe('DeleteContentModalComponent', () => {
  let component: DeleteContentModalComponent;
  let fixture: ComponentFixture<DeleteContentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [DeleteContentService],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
