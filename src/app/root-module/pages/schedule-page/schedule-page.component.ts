/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss',
})
export class SchedulePageComponent {
  activeNav = 'grupy';
  readonly buttons = ['sale', 'pracownicy', 'grupy'];

  handleToggleActiveSection(section: string): void {
    this.activeNav = section;
  }
}
