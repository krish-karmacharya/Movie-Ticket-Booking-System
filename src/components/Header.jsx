import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#1E2028] text-white p-3">
      {/* Desktop menu */}
      <div className="hidden md:flex justify-between items-center container mx-auto px-4 py-2">
        <a
          href="#"
          className="font-bold text-2xl text-white bg-blue-600 px-3 py-1 rounded"
        >
          Logo
        </a>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="hover:text-gray-300 text-lg">
              Home
            </a>
          </li>
          <li>
            <a href="all_movies.html" className="hover:text-gray-300 text-lg">
              Movies
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300 text-lg">
              Upcoming
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300 text-lg">
              Trending
            </a>
          </li>
          <li>
            <div className="flex items-center justify-center">
              <div className="border w-fit rounded-xl shadow-sm">
                <button className="px-4 py-2 rounded-l-xl text-white m-0 bg-red-500 hover:bg-red-600 transition">Login</button>
                <button className="px-4 py-2 rounded-r-xl bg-neutral-50 hover:bg-neutral-100 transition text-black hover:text-gray-700">Register</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="flex justify-between items-center p-2">
          <a href="#" className="font-bold text-xl text-white">
            Movie Gallery
          </a>
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
                  <li>
                    <a
                      href="#"
                      className="block px-6 py-2 text-gray-800 hover:bg-gray-100 text-lg"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="all_movies.html"
                      className="block px-6 py-2 text-gray-800 hover:bg-gray-100 text-lg"
                    >
                      Movies
                    </a>
                  </li>
                  <li>
                    <a
                      href="upcomming_movies.html"
                      className="block px-6 py-2 text-gray-800 hover:bg-gray-100 text-lg"
                    >
                      Upcoming
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-6 py-2 text-gray-800 hover:bg-gray-100 text-lg"
                    >
                      Trending
                    </a>
                  </li>
                  <li className="px-6 py-2">
                    <div className="flex items-center justify-center">
                      <div className="border w-full rounded-xl shadow-sm">
                        <button className="px-4 py-2 rounded-l-xl text-white m-0 bg-red-500 hover:bg-red-600 transition">Login</button>
                        <button className="px-4 py-2 rounded-r-xl bg-neutral-50 hover:bg-neutral-100 transition text-black hover:text-gray-700">Register</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
