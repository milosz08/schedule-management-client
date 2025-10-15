import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  private readonly DEF_SUFFIX = 'System Zarządzania Planem';
  private readonly SEPARATOR = '|';

  constructor(private readonly _title: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    this._title.setTitle(
      title !== undefined
        ? `${title} ${this.SEPARATOR} ${this.DEF_SUFFIX}`
        : this.DEF_SUFFIX
    );
  }
}

export const titleStrategyProvider = {
  provide: TitleStrategy,
  useClass: TemplatePageTitleStrategy,
};
