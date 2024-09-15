import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#1E2028] text-white p-2 fixed top-0 left-0 right-0 z-50">
      {/* Desktop menu */}
      <div className="hidden md:flex justify-between items-center container mx-auto px-4 py-1">
        <NavLink to="/"
          className="font-bold text-xl text-white bg-blue-600 px-2 py-0.5 rounded"
        >
          Logo
        </NavLink>
        <ul className="flex space-x-6">
          <li>
            <NavLink to="/" className="hover:text-gray-300 text-base">
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/UpComming" className="hover:text-gray-300 text-base">
              Upcoming
            </NavLink>
          </li>
          <li>
            <NavLink to="/StreamingSection" className="hover:text-gray-300 text-base">
              Trending
            </NavLink>
          </li>
          <li>
            <div className="flex items-center justify-center space-x-2">
              <NavLink to="/SignInForm" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</NavLink>
            </div>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="flex justify-between items-center p-1">
          <NavLink to="/" className="font-bold text-lg text-white">
            Movie Gallery
          </NavLink>
          <button
            onClick={toggleMenu}
            className="bg-[#1E2028] text-white p-1 rounded-md shadow-lg focus:outline-none"
          >
            <Menu size={20} />
          </button>
        </div>
        {isMenuOpen && (
          <div className="fixed inset-0 bg-[#1E2028] bg-opacity-50 z-40">
            <div className="bg-white h-full w-72 absolute right-0 shadow-lg">
              <div className="flex justify-between items-center p-3 border-b">
                <h2 className="text-base font-bold text-gray-800">Menu</h2>
                <button
                  onClick={toggleMenu}
                  className="text-gray-600 focus:outline-none"
                >
                  <X size={20} />
                </button>
              </div>
              <nav>
                <ul className="py-3">
                  <li>
                    <NavLink
                      to="/"
                      className="block px-5 py-1.5 text-gray-800 hover:bg-gray-100 text-base"
                    >
                      Movies
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/UpComming"
                      className="block px-5 py-1.5 text-gray-800 hover:bg-gray-100 text-base"
                    >
                      Upcoming
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/StreamingSection"
                      className="block px-5 py-1.5 text-gray-800 hover:bg-gray-100 text-base"
                    >
                      Trending
                    </NavLink>
                  </li>
                  <li className="px-5 py-1.5">
                    <div className="flex flex-col space-y-1.5">
                      <NavLink to="/SignInForm" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</NavLink>
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

export default Nav;
