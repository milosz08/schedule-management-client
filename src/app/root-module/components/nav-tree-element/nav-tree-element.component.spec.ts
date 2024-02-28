/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { ScheduleNavigationService } from '~/root-module/services/schedule-navigation/schedule-navigation.service';
import { NavTreeElementComponent } from './nav-tree-element.component';

describe('NavTreeElementComponent', () => {
  let component: NavTreeElementComponent;
  let fixture: ComponentFixture<NavTreeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
      providers: [ScheduleNavigationService],
    }).compileComponents();

    fixture = TestBed.createComponent(NavTreeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
