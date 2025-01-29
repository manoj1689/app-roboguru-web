import React, { useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex w-full bg-white fixed shadow-sm h-20 top-0 z-50">
      <div className="lg:container mx-auto flex w-full py-4 px-4">
        <div className="flex w-full justify-between items-center">
          {/* Hamburger Button */}
          <button
            id="menu-toggle"
            className="block md:hidden text-2xl"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <span id="icon-close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            ) : (
              <span id="icon-hamburger">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </span>
            )}
          </button>

          {/* Left: Logo */}
          <div className="flex max-md:w-1/3 items-center space-x-2">
            <img
              src="/images/robologo.png"
              alt="RoboGuru Logo"
              className="w-32 lg:w-40 ml-4"
            />
          </div>

          {/* Middle: Navigation */}
          <nav
            id="menu"
            className={`${
              menuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row md:space-x-8 max-md:w-11/12 bg-[#418BBB] max-md:rounded-xl md:bg-transparent md:static absolute top-20 left-4 text-center shadow-md md:shadow-none`}
          >
            <ul className="flex max-md:flex-col space-y-4 md:space-y-0 sm:space-x-2 lg:space-x-6 items-center max-md:py-4 max-md:px-4">
              <li>
                <a href="#features" className="hover:text-[#63A7D4]">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#63A7D4]">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-[#63A7D4]">
                  Community
                </a>
              </li>
              <li className="max-lg:hidden">
                <a href="#pricing" className="hover:text-[#63A7D4]">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#63A7D4]">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#download"
                  className="border  border-pink-300 bg-pink-200 text-[#63A7D4]   rounded-md  p-2 "
                >
                  Download
                </a>
              </li>
            </ul>
          </nav>

          {/* Right: Auth Buttons & Download */}
          <div className="flex max-md:w-2/3 justify-end items-center space-x-4">
            {/* Sign In Button */}
            <Link href="/Signin">
              <button className="text-sm border rounded-lg border-[#63A7D4] hover:border-[#63A7D4] px-4 py-2 font-medium text-[#63A7D4] hover:text-[#63A7D4] hover:bg-[#EAF6FC]">
                Sign In
              </button>
            </Link>

            {/* Sign Up Button */}
            <Link href="#">
              <button className="bg-[#63A7D4] text-white text-sm font-medium px-4 py-2 rounded hover:bg-[#5793bb]">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
