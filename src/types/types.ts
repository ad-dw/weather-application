export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface CurrentWeather {
  time: string;
  interval: number;
  apparent_temperature: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

interface CurrentWeatherUnits {
  time: string;
  interval: string;
  apparent_temperature: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  wind_speed_10m: string;
  weather_code: string;
}

interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

interface DailyWeatherUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  weather_code: string;
}

interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  relative_humidity_2m: number[];
}

interface HourlyWeatherUnits {
  time: string;
  temperature_2m: string;
  weather_code: string;
  wind_speed_10m: string;
  relative_humidity_2m: string;
}

export interface WeatherData {
  current: CurrentWeather;
  current_units: CurrentWeatherUnits;

  daily: DailyWeather;
  daily_units: DailyWeatherUnits;

  hourly: HourlyWeather;
  hourly_units: HourlyWeatherUnits;

  elevation: number;

  generationtime_ms: number;

  latitude: number;
  longitude: number;

  timezone: string;
  timezone_abbreviation: string;

  utc_offset_seconds: number;
  location: City;
}

export interface ForecastData {
  day: string;
  icon: string;
  maxTemp: string;
  minTemp: string;
  desc: string;
}

export interface HourData {
  time: string;
  icon: string;
  temp: string;
  humidity: string;
  windSpeed: string;
}

export interface CurrentData {
  city: string;
  country: string;
  temp: string;
  feelsLike: string;
  humidity: string;
  windSpeed: string;
  weatherCode: number | undefined;
  minTemp: string;
  maxTemp: string;
}
