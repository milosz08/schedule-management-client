import { Component, Input } from '@angular/core';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';

@Component({
  selector: '[app-delete-element]',
  templateUrl: './delete-element.component.html',
  host: { class: 'app-cms__table-tr' },
})
export class DeleteElementComponent {
  @Input() editRoutePath = '';
  @Input() deleteContentId?: number;
  @Input() disableEditDetailsButton = false;
  @Input() isRemovable = false;

  constructor(private readonly _deleteContentService: DeleteContentService) {}

  handleDeleteContent(): void {
    this._deleteContentService.openDeleteContentModal(this.deleteContentId);
  }

  handleToggleSelectedDeleteContent(isChecked: boolean): void {
    this._deleteContentService.setDeleteContentIds(
      this.deleteContentId,
      !isChecked
    );
  }
}
