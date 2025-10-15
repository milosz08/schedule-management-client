import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { SnackbarsContainerComponent } from './snackbars-container.component';

describe('SnackbarsContainerComponent', () => {
  let component: SnackbarsContainerComponent;
  let fixture: ComponentFixture<SnackbarsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
