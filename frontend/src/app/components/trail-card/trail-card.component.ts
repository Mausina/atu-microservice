import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Trail, Weather } from '../../models/trail.model';
import { WeatherService } from '../../services/weather.service';
import { WeatherIllustrationComponent } from '../weather-illustration/weather-illustration.component';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';

@Component({
  selector: 'app-trail-card',
  standalone: true,
  imports: [CommonModule, RouterLink, WeatherIllustrationComponent, WeatherIconComponent],
  templateUrl: './trail-card.component.html',
  styleUrls: ['./trail-card.component.css']
})
export class TrailCardComponent implements OnInit {
  @Input() trail!: Trail;

  weather: Weather | null = null;
  moodClass = 'mood-cloudy';
  suitability = '';
  badgeClass = '';

  constructor(private ws: WeatherService) {}

  ngOnInit() {
    this.ws.getCurrentWeather(this.trail.lat, this.trail.lon).subscribe({
      next: w => {
        this.weather = w;
        this.moodClass = this.getMoodClass(w.main);
        this.suitability = this.ws.getSuitability(w.main, w.temp);
        this.badgeClass = this.getBadgeClass(this.suitability);
      },
      error: () => {
        this.moodClass = 'mood-cloudy';
      }
    });
  }

  private getMoodClass(main: string): string {
    if (main === 'Clear') return 'mood-sunny';
    if (main === 'Rain' || main === 'Drizzle' || main === 'Thunderstorm') return 'mood-rainy';
    if (main === 'Snow') return 'mood-snowy';
    return 'mood-cloudy';
  }

  private getBadgeClass(s: string): string {
    if (s === 'Recommended') return 'badge-soft-recommended';
    if (s === 'Caution') return 'badge-soft-caution';
    return 'badge-soft-notadvised';
  }
}
