import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weather } from '../../models/trail.model';
import { WeatherIllustrationComponent } from '../weather-illustration/weather-illustration.component';

@Component({
  selector: 'app-weather-banner',
  standalone: true,
  imports: [CommonModule, WeatherIllustrationComponent],
  templateUrl: './weather-banner.component.html',
  styleUrls: ['./weather-banner.component.css']
})
export class WeatherBannerComponent implements OnChanges {
  @Input() weather: Weather | null = null;
  @Input() location: string = '';

  moodClass = 'mood-cloudy';

  ngOnChanges() {
    if (this.weather) {
      this.moodClass = this.getMoodClass(this.weather.main);
    }
  }

  private getMoodClass(main: string): string {
    if (main === 'Clear') return 'mood-sunny';
    if (main === 'Rain' || main === 'Drizzle' || main === 'Thunderstorm') return 'mood-rainy';
    if (main === 'Snow') return 'mood-snowy';
    return 'mood-cloudy';
  }
}
