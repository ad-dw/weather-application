import { WeatherData } from "../types/types";

const weatherDescription: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light Drizzle",
  53: "Moderate Drizzle",
  55: "Dense Drizzle",
  56: "Light Freezing Drizzle",
  57: "Dense Freezing Drizzle",
  61: "Slight Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  66: "Light Freezing Rain",
  67: "Heavy Freezing Rain",
  71: "Slight Snow Fall",
  73: "Moderate Snow Fall",
  75: "Heavy Snow Fall",
  77: "Snow grains",
  80: "Slight Rain Showers",
  81: "Moderate Rain Showers",
  82: "Violent Rain Showers",
  85: "Slight Snow Showers",
  86: "Heavy Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

const weatherIcons: Record<number, string> = {
  0: "☀️", // Clear sky
  1: "🌤️", // Mainly clear
  2: "⛅", // Partly cloudy
  3: "☁️", // Overcast
  45: "🌫️", // Fog
  48: "🌫️", // Depositing rime fog
  51: "🌦️", // Light Drizzle
  53: "🌦️", // Moderate Drizzle
  55: "🌧️", // Dense Drizzle
  56: "🌧️", // Light Freezing Drizzle
  57: "🌧️", // Dense Freezing Drizzle
  61: "🌦️", // Slight Rain
  63: "🌧️", // Moderate Rain
  65: "🌧️", // Heavy Rain
  66: "🌧️", // Light Freezing Rain
  67: "🌧️", // Heavy Freezing Rain
  71: "🌨️", // Slight Snow Fall
  73: "🌨️", // Moderate Snow Fall
  75: "❄️", // Heavy Snow Fall
  77: "🌨️", // Snow grains
  80: "🌦️", // Slight Rain Showers
  81: "🌧️", // Moderate Rain Showers
  82: "⛈️", // Violent Rain Showers
  85: "🌨️", // Slight Snow Showers
  86: "🌨️", // Heavy Snow Showers
  95: "⛈️", // Thunderstorm
  96: "⛈️", // Thunderstorm with slight hail
  99: "⛈️", // Thunderstorm with heavy hail
};

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getWeatherDescription = (code: number | undefined) =>
  (code && weatherDescription[code]) || "Unknown";

export const getWeatherIcon = (code: number | undefined) =>
  (code && weatherIcons[code]) || "?";

export const getCurrentWeatherDatainFormat = (data: WeatherData) => {
  let currentData = {
    city: data?.location?.name || "",
    country: data?.location?.country || "",
    temp:
      data?.current?.temperature_2m + data?.current_units?.temperature_2m || "",
    feelsLike:
      data?.current?.apparent_temperature +
        data?.current_units?.apparent_temperature ||
      data?.current?.temperature_2m + data?.current_units?.temperature_2m,
    humidity:
      data?.current?.relative_humidity_2m +
      data?.current_units?.relative_humidity_2m,
    windSpeed:
      data?.current?.wind_speed_10m + data?.current_units?.wind_speed_10m || "",
    weatherCode: data?.current?.weather_code,
    minTemp:
      data?.daily?.temperature_2m_min[0] +
      data?.daily_units?.temperature_2m_min,
    maxTemp:
      data?.daily?.temperature_2m_max[0] +
      data?.daily_units?.temperature_2m_max,
  };
  return currentData;
};

export const getHourlyWeatherDatainFormat = (data: WeatherData) => {
  let hourlyData = [];
  for (let i = 0; i < 24; i++) {
    const hourData = {
      time: new Date(data.hourly.time[i]).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      icon: getWeatherIcon(data.hourly.weather_code[i]),
      temp: data.hourly.temperature_2m[i] + data.hourly_units.temperature_2m,
      humidity:
        data.hourly.relative_humidity_2m[i] +
        data.hourly_units.relative_humidity_2m,
      windSpeed:
        data.hourly.wind_speed_10m[i] + data.hourly_units.wind_speed_10m,
    };
    hourlyData.push(hourData);
  }
  return hourlyData;
};

export const getForecastData = (data: WeatherData) => {
  const dailyWeatherData = [];
  for (let i = 1; i < 7; i++) {
    const dailyData = {
      day: dayNames[new Date(data.daily.time[i]).getDay()],
      icon: getWeatherIcon(data.daily.weather_code[i]),
      maxTemp:
        data.daily.temperature_2m_max[i] + data.daily_units.temperature_2m_max,
      minTemp:
        data.daily.temperature_2m_min[i] + data.daily_units.temperature_2m_min,
      desc: getWeatherDescription(data.daily.weather_code[i]),
    };
    dailyWeatherData.push(dailyData);
  }
  return dailyWeatherData;
};
