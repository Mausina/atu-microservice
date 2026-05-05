import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastDay } from '../../models/trail.model';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';

@Component({
  selector: 'app-forecast-strip',
  standalone: true,
  imports: [CommonModule, WeatherIconComponent],
  templateUrl: './forecast-strip.component.html',
  styleUrls: ['./forecast-strip.component.css']
})
export class ForecastStripComponent {
  @Input() forecast: ForecastDay[] = [];

  formatDay(d: string): string {
    const date = new Date(d);
    return date.toLocaleDateString('en-IE', { weekday: 'short' }).toUpperCase();
  }

  mapMain(main: string): string {
    return main.charAt(0).toUpperCase() + main.slice(1).toLowerCase();
  }
}
