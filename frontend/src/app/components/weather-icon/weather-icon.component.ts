import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.css']
})
export class WeatherIconComponent {
  @Input() weatherMain: string = 'Clouds';
  @Input() iconCode: string = '';
  @Input() size: number = 48;

  getIconUrl(): string {
    return `https://openweathermap.org/img/wn/${this.iconCode}@2x.png`;
  }
}
