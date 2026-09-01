import { getWeatherIcon, getWeatherDescription } from "../../utils/weather.js";
import HumidityCard from "../HumidityCard/HumidityCard.js";
import WindSpeedCard from "../WindSpeedCard/WindSpeedCard.js";

const CurrentWeather = ({ currentWeatherData }) => {
  const weatherIcon = getWeatherIcon(currentWeatherData?.weatherCode);
  const description = getWeatherDescription(currentWeatherData?.weatherCode);
  return (
    <div className="w-full">
      <div className="backdrop-blur-md bg-white/30 p-4 m-4 rounded-md shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl md:text-4xl font-bold ">
              {currentWeatherData?.city}
            </span>
            <p>{currentWeatherData?.country}</p>
          </div>
          <div>
            <span className="text-3xl font-bold">
              {currentWeatherData?.temp}
            </span>
            <p>
              {currentWeatherData?.maxTemp}/{currentWeatherData?.minTemp}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl sm:text-4xl">{weatherIcon}</span>
            <span className="font-semibold">{description}</span>
          </div>
          <div>
            <span>Feels like : {currentWeatherData?.feelsLike}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <HumidityCard humidity={currentWeatherData?.humidity} />
          <WindSpeedCard windSpeed={currentWeatherData?.windSpeed} />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
