import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu as HeadlessMenu } from '@headlessui/react';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Changed to true to show profile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTrendingClick = () => {
    navigate('/Trending');
  };

  const NavItems = () => (
    <>
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
        <button onClick={handleTrendingClick} className="hover:text-gray-300 text-base">
          Trending
        </button>
      </li>
    </>
  );

  const UserMenu = () => (
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
            <NavLink to="/Profile" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
              Your Profile
            </NavLink>
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
  );

  return (
    <nav className="bg-[#1E2028] text-white p-2 fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center container mx-auto px-4 py-1">
        <NavLink to="/"
          className="font-bold text-xl text-white bg-blue-600 px-2 py-0.5 rounded"
        >
          Logo
        </NavLink>
        {isMobile ? (
          <button
            onClick={toggleMenu}
            className="bg-[#1E2028] text-white p-1 rounded-md shadow-lg focus:outline-none"
          >
            <Menu size={20} />
          </button>
        ) : (
          <ul className="flex space-x-6 items-center">
            <NavItems />
            {isLoggedIn && <li><UserMenu /></li>}
          </ul>
        )}
      </div>

      {isMobile && isMenuOpen && (
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
                <li className="px-5 py-2">
                  <NavLink to="/" className="block text-gray-800 hover:text-gray-600">
                    Movies
                  </NavLink>
                </li>
                <li className="px-5 py-2">
                  <NavLink to="/UpComming" className="block text-gray-800 hover:text-gray-600">
                    Upcoming
                  </NavLink>
                </li>
                <li className="px-5 py-2">
                  <button onClick={handleTrendingClick} className="block text-gray-800 hover:text-gray-600">
                    Trending
                  </button>
                </li>
                {isLoggedIn && (
                  <li className="px-5 py-2">
                    <UserMenu />
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
