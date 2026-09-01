const Forecast = ({ forecastData }) => {
  return (
    <div className="w-full py-2 px-6">
      <h2 className="text-3xl font-bold mb-4 px-4">6-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {forecastData.map((data, idx) => {
          const { day, icon, minTemp, maxTemp, desc } = data;
          return (
            <div
              className="flex flex-col items-center justify-center bg-white/40 p-4 rounded-xl gap-1 border border-2 shadow-lg border-white/50 cursor-pointer hover:scale-105 transition-all duration-300"
              key={idx + day}
            >
              <span>{day}</span>
              <span className="text-2xl sm:text-3xl">{icon}</span>
              <span className="text-xl font-bold">
                {maxTemp} &nbsp;
                <span className="text-white/90 text-sm">{minTemp}</span>
              </span>
              <span className="text-sm">{desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
