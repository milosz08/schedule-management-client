import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent {
  isHamburgerOpen = false;

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 1090 && this.isHamburgerOpen) {
      this.isHamburgerOpen = false;
    }
  }

  handleHamburgerToggle(): void {
    this.isHamburgerOpen = !this.isHamburgerOpen;
  }
}
