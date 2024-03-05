/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsModule } from '~/cms-module/cms.module';
import { TableDataHeaderComponent } from './table-data-header.component';

describe('TableDataHeaderComponent', () => {
  let component: TableDataHeaderComponent;
  let fixture: ComponentFixture<TableDataHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TableDataHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
