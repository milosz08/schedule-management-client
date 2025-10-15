import { Component, Input } from '@angular/core';
import { PlotDotColor } from '~/cms-module/types/plot-dot-color.type';

@Component({
  selector: 'app-plot-description',
  templateUrl: './plot-description.component.html',
  styleUrl: './plot-description.component.scss',
})
export class PlotDescriptionComponent {
  @Input() label = '';
  @Input() data?: string | number;
  @Input() color?: PlotDotColor;
}
