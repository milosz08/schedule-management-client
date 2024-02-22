/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasicCopyFooterComponent } from './components/basic-copy-footer/basic-copy-footer.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [NotFoundPageComponent, BasicCopyFooterComponent],
  imports: [CommonModule],
  providers: [],
  exports: [BasicCopyFooterComponent],
})
export class SharedModule {}
