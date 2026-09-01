import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import {
  getCurrentWeatherDatainFormat,
  getHourlyWeatherDatainFormat,
  getForecastData,
} from "./utils/weather.ts";
import HourlyWeather from "./components/HourlyWeather/HourlyWeather.js";
import Forecast from "./components/Forecast/Forecast.js";
import Spinner from "./components/Spinner/Spinner.js";
import {
  City,
  WeatherData,
  ForecastData,
  HourData,
  CurrentData,
} from "./types/types";

const baseUrl = "https://api.open-meteo.com/v1/forecast";

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [data, setData] = useState<WeatherData | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentData | null>(
    null,
  );
  const [hourlyWeatherData, setHourlyWeatherData] = useState<HourData[] | null>(
    null,
  );
  const [forecastData, setForecastData] = useState<ForecastData[] | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    try {
      const getWeatherData = async () => {
        if (!selectedCity) return;
        setIsDataLoading(true);
        const params = new URLSearchParams({
          latitude: selectedCity.latitude.toString(),
          longitude: selectedCity.longitude.toString(),
          current:
            "apparent_temperature,temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
          daily: "temperature_2m_max,temperature_2m_min,weather_code",
          hourly:
            "temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m",
          timezone: "auto",
        });

        const URL = `${baseUrl}?${params.toString()}`;
        const res = await fetch(URL);
        const weatherData = await res.json();
        setData({ ...weatherData, location: selectedCity });
      };
      getWeatherData();
    } catch (error: unknown) {
      console.log(error);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (!data) return;
    const currentData = getCurrentWeatherDatainFormat(data);
    const hourlyData = getHourlyWeatherDatainFormat(data);
    const forecastingData = getForecastData(data);
    setCurrentWeather(currentData);
    setHourlyWeatherData(hourlyData);
    setForecastData(forecastingData);
    setIsDataLoading(false);
  }, [data]);

  return (
    <main className="flex flex-col items-center gap-4 py-4 min-h-dvh max-w-[1280px] mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
      <Header />
      <SearchBar
        suggestions={suggestions}
        setSelectedCity={setSelectedCity}
        setSuggestions={setSuggestions}
      />
      {isDataLoading && (
        <div className="w-full h-full flex items-center justify-center p-10">
          <Spinner color={"white"} />
        </div>
      )}
      {currentWeather && <CurrentWeather currentWeatherData={currentWeather} />}
      {hourlyWeatherData && hourlyWeatherData?.length > 0 && (
        <HourlyWeather hourlyData={hourlyWeatherData} />
      )}
      {forecastData && forecastData?.length > 0 && (
        <Forecast forecastData={forecastData} />
      )}
    </main>
  );
}

export default App;
