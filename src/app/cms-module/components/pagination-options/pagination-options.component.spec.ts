/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { PaginationOptionsComponent } from './pagination-options.component';

describe('PaginationOptionsComponent', () => {
  let component: PaginationOptionsComponent;
  let fixture: ComponentFixture<PaginationOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
      providers: [PaginationService],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
