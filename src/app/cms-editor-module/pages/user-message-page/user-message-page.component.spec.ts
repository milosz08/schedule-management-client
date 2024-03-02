/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { UserMessagePageComponent } from './user-message-page.component';

describe('UserMessagePageComponent', () => {
  let component: UserMessagePageComponent;
  let fixture: ComponentFixture<UserMessagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMessagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
