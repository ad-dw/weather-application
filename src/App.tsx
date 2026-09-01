import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import {
  getCurrentWeatherDatainFormat,
  getHourlyWeatherDatainFormat,
  getForecastData,
} from "./utils/weather.js";
import HourlyWeather from "./components/HourlyWeather/HourlyWeather.js";
import Forecast from "./components/Forecast/Forecast.js";
import Spinner from "./components/Spinner/Spinner.js";

const baseUrl = "https://api.open-meteo.com/v1/forecast";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    try {
      const getWeatherData = async () => {
        if (!selectedCity) return;
        setIsDataLoading(true);
        const params = new URLSearchParams({
          latitude: selectedCity.latitude,
          longitude: selectedCity.longitude,
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
    } catch (e) {
      console.log(e.message);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (!data && !data?.current && !data?.hourly) return;
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
      {data && <CurrentWeather currentWeatherData={currentWeather} />}
      {hourlyWeatherData?.length > 0 && (
        <HourlyWeather hourlyData={hourlyWeatherData} />
      )}
      {forecastData?.length > 0 && <Forecast forecastData={forecastData} />}
    </main>
  );
}

export default App;
