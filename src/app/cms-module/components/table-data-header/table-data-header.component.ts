import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-data-header',
  templateUrl: './table-data-header.component.html',
})
export class TableDataHeaderComponent {
  @Input() header = '';
  @Input() inputPlaceholder = '';
  @Input() addContentUrl = '';
  @Input() addContentText = '';
}
