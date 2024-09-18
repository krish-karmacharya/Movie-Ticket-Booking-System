import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Menu as HeadlessMenu } from '@headlessui/react';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Changed to true to show profile

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
        <ul className="flex space-x-6 items-center">
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
          {isLoggedIn ? (
            <li>
              <HeadlessMenu as="div" className="relative ml-3">
                <div>
                  <HeadlessMenu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </HeadlessMenu.Button>
                </div>
                <HeadlessMenu.Items
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <a href="#" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                        Your Profile
                      </a>
                    )}
                  </HeadlessMenu.Item>
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <a href="#" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                        Settings
                      </a>
                    )}
                  </HeadlessMenu.Item>
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <a href="#" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                        Sign out
                      </a>
                    )}
                  </HeadlessMenu.Item>
                </HeadlessMenu.Items>
              </HeadlessMenu>
            </li>
          ) : (
            // <li>
            //   <div className="flex items-center justify-center space-x-2">
            //     <NavLink to="/SignInForm" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</NavLink>
            //   </div>
            // </li>
            null
          )}
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
                  {isLoggedIn ? (
                    <li className="px-5 py-1.5">
                      <HeadlessMenu as="div" className="relative">
                        <HeadlessMenu.Button className="flex items-center text-gray-800">
                          <img
                            alt=""
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="h-8 w-8 rounded-full mr-2"
                          />
                          <span>User Menu</span>
                        </HeadlessMenu.Button>
                        <HeadlessMenu.Items className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                          <HeadlessMenu.Item>
                            {({ active }) => (
                              <a href="#" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                                Your Profile
                              </a>
                            )}
                          </HeadlessMenu.Item>
                          <HeadlessMenu.Item>
                            {({ active }) => (
                              <a href="#" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                                Settings
                              </a>
                            )}
                          </HeadlessMenu.Item>
                          <HeadlessMenu.Item>
                            {({ active }) => (
                              <a href="#" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                                Sign out
                              </a>
                            )}
                          </HeadlessMenu.Item>
                        </HeadlessMenu.Items>
                      </HeadlessMenu>
                    </li>
                  ) : (
                    // <li className="px-5 py-1.5">
                    //   <div className="flex flex-col space-y-1.5">
                    //     <NavLink to="/SignInForm" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</NavLink>
                    //   </div>
                    // </li>
                    null
                  )}
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
