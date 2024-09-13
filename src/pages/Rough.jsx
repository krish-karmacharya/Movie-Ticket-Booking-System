import React, { useState } from "react";

const Rough = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    "Kathmandu",
    "Birtamode",
    "Nepalgunj",
    "Narayangarh",
    "Itahari",
    "Birgunj",
    "Biratnagar",
    "Butwal",
    "Damauli",
    "Pokhara",
  ];

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="relative">
      <div className="bg-gray-800 rounded-md shadow-md p-4">
        <h2 className="text-lg font-bold text-white mb-2">Cities</h2>
        <div className="grid grid-cols-2 gap-2">
          {cities.map((city) => (
            <button
              key={city}
              className={`bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md ${
                selectedCity === city ? "bg-blue-500" : ""
              }`}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
      {selectedCity && (
        <div className="absolute bottom-4 right-4 bg-gray-800 rounded-md shadow-md p-2 text-white">
          Selected City: {selectedCity}
        </div>
      )}
    </div>
  );
};

export default Rough;
