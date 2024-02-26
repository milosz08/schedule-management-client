/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { ContactService } from '~/root-module/services/contact/contact.service';
import { ContactFormElementsComponent } from './contact-form-elements.component';

describe('ContactFormElementsComponent', () => {
  let component: ContactFormElementsComponent;
  let fixture: ComponentFixture<ContactFormElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
      providers: [ContactService],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormElementsComponent);
    component = fixture.componentInstance;

    component.formData = new FormGroup({
      issueType: new FormControl(''),
      departmentName: new FormControl(''),
      description: new FormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
