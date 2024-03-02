/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { UserMessagesPageComponent } from './user-messages-page.component';

describe('UserMessagesPageComponent', () => {
  let component: UserMessagesPageComponent;
  let fixture: ComponentFixture<UserMessagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMessagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
