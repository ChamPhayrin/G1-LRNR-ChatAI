import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#2894f4] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/" onClick={() => setIsOpen(false)}>LRNR</Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:block">
          <Link
            to="/account"
            className="text-white hover:text-gray-400 mx-4"
          >
            Account
          </Link>
          <Link
            to="/quiz"
            className="text-white hover:text-gray-400 mx-4"
          >
            Quiz Generation
          </Link>
        </div>
        {isOpen && (
          <div
            className="fixed inset-0 bg-opacity-95 backdrop-blur-xs z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
        <div
          id="mobile-menu"
          className={`${
            isOpen ? 'block' : 'hidden'
          } fixed right-0 top-0 h-[20%] w-[25%] bg-[#1e7acb] p-4 z-50 shadow-lg transition-transform duration-1500 ease-in-out transform ${
            isOpen ? 'scale-100' : 'scale-0'
          } rounded-lg`}
          style={{ borderRadius: '5px' }}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="text-white focus:outline-none absolute top-2 right-2"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="text-sm mt-8">
            <Link
              to="/account"
              className="block mt-4 text-white  hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Account
            </Link>
            <Link
              to="/quiz"
              className="block mt-4 text-white  hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Quiz Generation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;