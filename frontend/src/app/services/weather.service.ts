import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Weather, ForecastDay } from '../models/trail.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  // todo: move to env
  private apiKey = 'deb0aa6f0db3ad4a94733b1e424294e8';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getCurrentWeather(lat: number, lon: number): Observable<Weather> {
    const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(data => ({
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        main: data.weather[0].main,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed
      }))
    );
  }

  getForecast(lat: number, lon: number): Observable<ForecastDay[]> {
    const url = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(data => this.processForecast(data.list))
    );
  }

  // search city by name — returns coords + weather in one shot
  searchCity(cityName: string): Observable<{ name: string, country: string, lat: number, lon: number, weather: Weather }> {
    const url = `${this.baseUrl}/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(data => ({
        name: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
        weather: {
          temp: Math.round(data.main.temp),
          feels_like: Math.round(data.main.feels_like),
          description: data.weather[0].description,
          main: data.weather[0].main,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          wind_speed: data.wind.speed
        }
      }))
    );
  }

  private processForecast(list: any[]): ForecastDay[] {
    // group 3hr forecasts by day, take midday-ish
    const days: { [key: string]: any[] } = {};
    list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!days[date]) days[date] = [];
      days[date].push(item);
    });

    const result: ForecastDay[] = Object.keys(days).slice(0, 5).map(date => {
      const items = days[date];
      const temps = items.map(i => i.main.temp);
      const middle = items[Math.floor(items.length / 2)];
      return {
        date,
        temp_min: Math.round(Math.min(...temps)),
        temp_max: Math.round(Math.max(...temps)),
        main: middle.weather[0].main,
        description: middle.weather[0].description,
        icon: middle.weather[0].icon
      };
    });

    // mark the best day for hiking
    let bestIdx = 0;
    let bestScore = -Infinity;
    result.forEach((d, i) => {
      let score = 0;
      if (d.main === 'Clear') score += 10;
      if (d.main === 'Clouds') score += 5;
      if (d.main === 'Rain') score -= 10;
      if (d.main === 'Snow') score -= 15;
      if (d.temp_max >= 15 && d.temp_max <= 25) score += 5;
      if (score > bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    });
    if (result[bestIdx]) result[bestIdx].isBest = true;

    return result;
  }

  getWeatherClass(main: string): string {
    switch (main) {
      case 'Clear': return 'weather-sunny';
      case 'Clouds': return 'weather-cloudy';
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm': return 'weather-rainy';
      case 'Snow': return 'weather-snowy';
      default: return 'weather-cloudy';
    }
  }

  getSuitability(main: string, temp: number): 'Recommended' | 'Caution' | 'Not Advised' {
    if (main === 'Thunderstorm' || main === 'Snow') return 'Not Advised';
    if (main === 'Rain' || temp < 0 || temp > 32) return 'Caution';
    return 'Recommended';
  }
}
