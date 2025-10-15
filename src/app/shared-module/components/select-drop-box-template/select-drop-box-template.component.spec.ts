import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { SelectDropBoxTemplateComponent } from './select-drop-box-template.component';

describe('SelectDropBoxTemplateComponent', () => {
  let component: SelectDropBoxTemplateComponent;
  let fixture: ComponentFixture<SelectDropBoxTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectDropBoxTemplateComponent);
    component = fixture.componentInstance;

    component.formControlId = 'test';
    component.formGroup = new FormGroup({
      test: new FormControl(''),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
