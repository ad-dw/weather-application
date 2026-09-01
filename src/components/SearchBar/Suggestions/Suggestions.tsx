import Spinner from "../../Spinner/Spinner";

const Suggestions = ({
  suggestions,
  setSelectedCity,
  setQuery,
  setSuggestions,
  loading,
}) => {
  const handleSuggestionClick = (city) => {
    const cityInfo = {
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    };
    setQuery(city.name);
    setSelectedCity(cityInfo);
    setSuggestions([]);
  };
  return (
    <div className="absolute top-45 left-0 z-50 w-full overflow-hidden">
      {loading && !suggestions.length && (
        <div className="m-2 flex items-center justify-center h-32 bg-white/80 rounded-xl overflow-hidden px-2">
          <Spinner />
        </div>
      )}
      {!loading && suggestions.length > 0 && (
        <ul className="flex flex-col m-2 rounded-xl backdrop-blur-lg bg-white/80 text-black shadow-lg overflow-hidden">
          {suggestions.map((city, idx) => {
            return (
              <li
                className="cursor-pointer p-2 hover:bg-gray-300"
                onClick={() => handleSuggestionClick(city)}
                key={idx + city.name}
              >
                {city.name}, {city.country}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Suggestions;
