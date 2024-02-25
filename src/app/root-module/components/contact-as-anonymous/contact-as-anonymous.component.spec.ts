/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { ContactAsAnonymousComponent } from './contact-as-anonymous.component';

describe('ContactAsAnonymousComponent', () => {
  let component: ContactAsAnonymousComponent;
  let fixture: ComponentFixture<ContactAsAnonymousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactAsAnonymousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
