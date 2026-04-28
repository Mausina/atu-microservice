import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-illustration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-illustration.component.html',
  styleUrls: ['./weather-illustration.component.css']
})
export class WeatherIllustrationComponent {
  @Input() weatherMain: string = 'Clouds';
  @Input() height: number = 240;

  getImagePath(): string {
    const mood = this.getMood();
    return `assets/illustrations/${mood}.svg`;
  }

  getMood(): string {
    const m = this.weatherMain;
    if (m === 'Clear') return 'sunny';
    if (m === 'Clouds') return 'cloudy';
    if (m === 'Rain' || m === 'Drizzle') return 'rainy';
    if (m === 'Thunderstorm') return 'thunder';
    if (m === 'Snow') return 'snowy';
    if (m === 'Mist' || m === 'Fog' || m === 'Haze') return 'foggy';
    return 'cloudy';
  }

  // fallback if optional images are missing
  onError(event: any) {
    const fallbackMap: { [key: string]: string } = {
      'thunder': 'rainy',
      'foggy': 'cloudy'
    };
    const mood = this.getMood();
    if (fallbackMap[mood]) {
      event.target.src = `assets/illustrations/${fallbackMap[mood]}.svg`;
    }
  }
}
