import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Bhaktapur");
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCitySelector = () => {
    setIsCitySelectorOpen(!isCitySelectorOpen);
  };

  const cities = [
    "Bhaktapur", "Kathmandu", "Birtamode", "Nepalgunj", "Narayangarh", "Itahari",
    "Birgunj", "Biratnagar", "Butwal", "Damauli", "Pokhara",
  ];

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setIsCitySelectorOpen(false);
  };

  return (
    <nav className="bg-[#1E2028] text-white p-3 fixed top-0 left-0 right-0 z-50">
      {/* Desktop menu */}
      <div className="hidden md:flex justify-between items-center container mx-auto px-4 py-2">
        <NavLink to="/"
          className="font-bold text-2xl text-white bg-blue-600 px-3 py-1 rounded"
        >
          Logo
        </NavLink>
        <ul className="flex space-x-6">
          <li>
            <button onClick={toggleCitySelector} className="hover:text-gray-300 text-lg">
              {selectedCity}
            </button>
          </li>
          <li>
            <NavLink to="/" className="hover:text-gray-300 text-lg">
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/UpComming" className="hover:text-gray-300 text-lg">
              Upcoming
            </NavLink>
          </li>
          <li>
            <NavLink to="/StreamingSection" className="hover:text-gray-300 text-lg">
              Trending
            </NavLink>
          </li>
          <li>
            <div className="flex items-center justify-center space-x-2">
              <NavLink to="/SignInForm" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</NavLink>
            </div>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="flex justify-between items-center p-2">
          <NavLink to="/" className="font-bold text-xl text-white">
            Movie Gallery
          </NavLink>
          <button
            onClick={toggleMenu}
            className="bg-[#1E2028] text-white p-2 rounded-md shadow-lg focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
        {isMenuOpen && (
          <div className="fixed inset-0 bg-[#1E2028] bg-opacity-50 z-40">
            <div className="bg-white h-full w-72 absolute right-0 shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold text-gray-800">Menu</h2>
                <button
                  onClick={toggleMenu}
                  className="text-gray-600 focus:outline-none"
                >
                  <X size={24} />
                </button>
              </div>
              <nav>
                <ul className="py-4">
                  <li className="px-6 py-2">
                    <button onClick={toggleCitySelector} className="text-gray-800 hover:bg-gray-100 text-lg">
                      {selectedCity}
                    </button>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className="block px-6 py-2 text-gray-800 hover:bg-gray-100 text-lg"
                    >
                      Movies
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/UpComming"
                      className="block px-6 py-2 text-gray-800 hover:bg-gray-100 text-lg"
                    >
                      Upcoming
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/StreamingSection"
                      className="block px-6 py-2 text-gray-800 hover:bg-gray-100 text-lg"
                    >
                      Trending
                    </NavLink>
                  </li>
                  <li className="px-6 py-2">
                    <div className="flex flex-col space-y-2">
                      <NavLink to="/SignInForm" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</NavLink>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* City Selector */}
      {isCitySelectorOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-md shadow-md p-4 w-80">
            <h2 className="text-lg font-bold text-white mb-2">Cities</h2>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((city) => (
                <button
                  key={city}
                  className={`bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md ${selectedCity === city ? 'bg-blue-500' : ''
                    }`}
                  onClick={() => handleCityClick(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
