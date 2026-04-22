export interface Trail {
    _id?: string;
    id?: number;
    name: string;
    location: string;
    lat: number;
    lon: number;
    difficulty: 'Easy' | 'Moderate' | 'Hard';
    distance: number;
    duration: string;
    elevation: number;
    description?: string;
}

export interface Weather {
    temp: number;
    feels_like: number;
    description: string;
    main: string;
    icon: string;
    humidity: number;
    wind_speed: number;
}

export interface ForecastDay {
    date: string;
    temp_min: number;
    temp_max: number;
    main: string;
    description: string;
    icon: string;
    isBest?: boolean;
}
