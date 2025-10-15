import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { SharedModule } from '~/shared-module/shared.module';
import { BasicCopyFooterComponent } from './basic-copy-footer.component';

describe('BasicCopyFooterComponent', () => {
  let component: BasicCopyFooterComponent;
  let fixture: ComponentFixture<BasicCopyFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicCopyFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
