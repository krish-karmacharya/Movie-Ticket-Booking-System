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
        <a href="#" className="font-bold text-2xl text-white bg-blue-600 px-3 py-1 rounded">
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
            <a href="upcomming_movies.html" className="hover:text-gray-300 text-lg">
              Upcoming
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300 text-lg">
              Trending
            </a>
          </li>
          <li>
            <button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-base px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2">
              <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
              </svg>
              Sign in with Google
            </button>
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
                    <button type="button" className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55">
                      <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                        <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                      </svg>
                      Sign in with Google
                    </button>
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
