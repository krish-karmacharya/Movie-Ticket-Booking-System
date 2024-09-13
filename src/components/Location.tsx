import React, { useState } from "react";

interface Location {
  id: number;
  name: string;
}

const Location: React.FC = () => {
  const locations: Location[] = [
    { id: 1, name: "Kathmandu" },
    { id: 2, name: "Birtamode" },
    { id: 3, name: "Nepalgunj" },
    { id: 4, name: "Narayangath" },
    { id: 5, name: "Itahari" },
    { id: 6, name: "Birgunj" },
    { id: 7, name: "Biratnagar" },
    { id: 8, name: "Butwal" },
    { id: 9, name: "Damuli" },
    { id: 10, name: "Pokhara" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>(
    locations[0]
  );

  const toggleLocationDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        onClick={toggleLocationDropdown}
      >
        {selectedLocation.name}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="origin-top-right w-56 rounded-md shadow-lg bg-[#333333] ring-1 ring-black ring-opacity-5">
            <div
              className="py-1 px-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <h3 className="text-white text-lg mb-2">Cities</h3>
              <div className="grid grid-cols-2 gap-2">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationSelect(location)}
                    className={`text-left px-3 py-2 text-sm rounded-md ${
                      selectedLocation.id === location.id
                        ? "bg-[#00C4FF] text-white"
                        : "bg-[#4D4D4D] text-white hover:bg-[#5A5A5A]"
                    }`}
                    role="menuitem"
                  >
                    {location.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;
