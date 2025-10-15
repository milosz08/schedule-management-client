import { AfterViewInit, Component, Input } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { PlotDotColor } from '~/cms-module/types/plot-dot-color.type';

@Component({
  selector: 'app-round-plot',
  templateUrl: './round-plot.component.html',
  styleUrl: './round-plot.component.scss',
})
export class RoundPlotComponent implements AfterViewInit {
  @Input() colors: PlotDotColor[] = [];
  @Input() data: number[] = [];
  @Input() allElements = 0;

  plotUuid = `crc-${uuidv4()}`;

  ngAfterViewInit(): void {
    const circles = document.querySelectorAll(
      `.${this.plotUuid}`
    ) as NodeListOf<SVGAElement>;
    if (this.colors.length !== this.data.length) {
      return;
    }
    let prevSize: number = 0;
    for (let i = 0; i < circles.length; i++) {
      const circle = [...circles].reverse()[i];
      const percentage = (100.0 * this.data[i]) / this.allElements;
      circle.style.strokeDasharray = `calc(${percentage + prevSize} * (3.1416 * 42px) / 100) calc(3.1416 * 42px)`;
      prevSize += percentage;
    }
  }
}
