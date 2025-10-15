import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-copy-footer',
  templateUrl: './basic-copy-footer.component.html',
  styleUrl: './basic-copy-footer.component.scss',
})
export class BasicCopyFooterComponent {
  currentDate = new Date();
}
