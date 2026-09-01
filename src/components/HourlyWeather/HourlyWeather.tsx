const HourlyWeather = ({ hourlyData }) => {
  return (
    <div className="w-full">
      <div className="m-4 backdrop-blur bg-white/20 p-2 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-start p-2">Today's Weather</h2>
        <div className="flex gap-2 overflow-x-scroll">
          {hourlyData.map((hour, idx) => {
            const { time, icon, temp, humidity, windSpeed } = hour;
            return (
              <div
                className="backdrop-blur-md bg-white/20 p-2 rounded-md min-w-[120px] hover:bg-white/40 cursor-pointer transition-all duration-300 shadow-md mb-4"
                key={idx + temp + humidity}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <span>{time}</span>
                  <span className="text-2xl">{icon}</span>
                  <span className="text-lg font-bold">{temp}</span>
                  <span className="text-sm">{humidity}</span>
                  <span className="text-sm">{windSpeed}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HourlyWeather;
