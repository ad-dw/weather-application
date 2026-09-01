import React, { useState } from "react";
import Suggestions from "./Suggestions/Suggestions";
import { City } from "../../types/types";

const baseUrl = "https://geocoding-api.open-meteo.com/v1/search";

interface SearchBarProps {
  suggestions: City[];
  setSelectedCity: (city: City) => void;
  setSuggestions: (suggestions: City[]) => void;
}

const SearchBar = ({
  suggestions,
  setSelectedCity,
  setSuggestions,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, "");
    setQuery(value);
    if (value.length < 3) return;
    try {
      setSuggestions([]);
      setLoading(true);
      const res = await fetch(
        `${baseUrl}?name=${encodeURIComponent(
          value,
        )}&count=5&language=en&format=json`,
      );
      const data = await res.json();
      setSuggestions(data.results);
    } catch (e: Error | unknown) {
      console.log(
        e instanceof Error ? e.message : "Error fetching suggestions",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full sm:w-1/2 px-4 relative">
      <input
        placeholder="Search any City...."
        type="search"
        onChange={handleChange}
        value={query}
        className="w-full p-2 rounded-xl font-light backdrop-blur-lg bg-white/20 shadow-lg placeholder:text-white border border-white/30 outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
      />
      <Suggestions
        suggestions={suggestions}
        setQuery={setQuery}
        setSelectedCity={setSelectedCity}
        setSuggestions={setSuggestions}
        loading={loading}
      />
    </div>
  );
};

export default SearchBar;
