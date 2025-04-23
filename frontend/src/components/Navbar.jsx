import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-blue-400 font-bold text-xl">MonthChallenge</span>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a
              href="/"
              className="text-gray-300 hover:bg-gray-800 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/create"
              className="text-gray-300 hover:bg-gray-800 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Create Blog
            </a>
            <a
              href="/about"
              className="text-gray-300 hover:bg-gray-800 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              About
            </a>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-400 hover:bg-gray-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            <a
              href="/"
              className="block text-gray-300 hover:bg-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="/create"
              className="block text-gray-300 hover:bg-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium"
            >
              Create Blog
            </a>
            <a
              href="/about"
              className="block text-gray-300 hover:bg-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;