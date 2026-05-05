import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Trail, Weather, ForecastDay } from '../../models/trail.model';
import { TrailService } from '../../services/trail.service';
import { WeatherService } from '../../services/weather.service';
import { WeatherBannerComponent } from '../../components/weather-banner/weather-banner.component';
import { ForecastStripComponent } from '../../components/forecast-strip/forecast-strip.component';
import { WeatherIconComponent } from '../../components/weather-icon/weather-icon.component';

@Component({
  selector: 'app-trail-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, WeatherBannerComponent, ForecastStripComponent, WeatherIconComponent],
  templateUrl: './trail-detail.component.html',
  styleUrls: ['./trail-detail.component.css']
})
export class TrailDetailComponent implements OnInit {
  trail: Trail | undefined;
  weather: Weather | null = null;
  realWeather: Weather | null = null;  // real one from API, kept for restore
  forecast: ForecastDay[] = [];
  warning = '';
  loading = true;
  saving = false;
  saved = false;
  saveError = '';
  todayLabel = '';

  // demo weather override — for showing how illustration changes
  demoModes = [
    { label: 'Live', main: '', icon: '' },
    { label: 'Sunny', main: 'Clear', icon: '01d' },
    { label: 'Cloudy', main: 'Clouds', icon: '03d' },
    { label: 'Rainy', main: 'Rain', icon: '10d' },
    { label: 'Snowy', main: 'Snow', icon: '13d' }
  ];
  activeMode = 'Live';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trailService: TrailService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.todayLabel = new Date().toLocaleDateString('en-IE', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.trailService.getTrailById(id).subscribe(trail => {
      this.trail = trail;
      this.loading = false;
      if (trail) {
        this.loadWeather(trail);
      }
    });
  }

  setDemoMode(mode: { label: string, main: string, icon: string }) {
    this.activeMode = mode.label;
    if (mode.label === 'Live') {
      // restore real api data
      this.weather = this.realWeather;
      if (this.realWeather) this.checkWarning(this.realWeather);
    } else {
      // override main/icon, keep other fields from real weather as fallback
      const base = this.realWeather || {
        temp: 15, feels_like: 14, description: '', main: '', icon: '',
        humidity: 70, wind_speed: 5
      };
      this.weather = {
        ...base,
        main: mode.main,
        icon: mode.icon,
        description: mode.label.toLowerCase()
      };
      this.checkWarning(this.weather);
    }
  }

  private loadWeather(trail: Trail) {
    this.weatherService.getCurrentWeather(trail.lat, trail.lon).subscribe(w => {
      this.realWeather = w;
      this.weather = w;
      this.checkWarning(w);
    });
    this.weatherService.getForecast(trail.lat, trail.lon).subscribe(f => {
      this.forecast = f;
    });
  }

  private checkWarning(w: Weather) {
    if (w.main === 'Thunderstorm') {
      this.warning = 'Thunderstorm conditions — hiking not advised.';
    } else if (w.main === 'Snow') {
      this.warning = 'Snowy conditions — extra caution and gear required.';
    } else if (w.wind_speed > 15) {
      this.warning = 'High winds — exposed sections may be dangerous.';
    } else if (w.temp < 0) {
      this.warning = 'Freezing temperatures — dress accordingly.';
    } else if (w.main === 'Rain') {
      this.warning = 'Light rain — paths may be slippery.';
    }
  }

  save() {
    if (!this.trail) return;
    this.saving = true;
    this.saveError = '';
    this.trailService.saveTrail(this.trail).subscribe({
      next: () => {
        this.saved = true;
        this.saving = false;
      },
      error: () => {
        this.saveError = 'Failed to save. Check your backend connection.';
        this.saving = false;
      }
    });
  }
}
