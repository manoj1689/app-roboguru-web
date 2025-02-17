import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next"; // Import translation hook
import i18n from "@/utils/i18n"; // Import i18n configuration


const Navbar: React.FC = () => {
  const { t } = useTranslation();
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
            <div className="  ">
              {/* Logo */}
              <div className="hidden md:flex max-lg:pl-8  items-center space-x-2">
                <Link href="/">
                  <img
                    src="/images/robologo.png"
                    alt="RoboGuru Logo"
                    className="w-32 sm:w-48 cursor-pointer"
                  />
                </Link>
              </div>
              <div className="md:hidden flex pl-4  items-center space-x-2">
                <Link href="/">
                  <img
                    src="/images/robo-logo.png"
                    alt="RoboGuru Logo"
                    className="w-12 cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Middle: Navigation */}
          <nav
            id="menu"
            className={`${menuOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row md:space-x-8 max-md:w-11/12 bg-[#418BBB] max-md:rounded-xl md:bg-transparent md:static absolute top-24 left-4 text-center shadow-md md:shadow-none`}
          >
            <ul className="flex max-md:flex-col space-y-4 md:space-y-0 sm:space-x-2 lg:space-x-6 items-center max-md:py-4 max-md:px-4">
              <li>
                <a href="#features" className="text-white md:text-[#1E2630] text-md font-medium md:hover:text-[#63A7D4]">
                  {t("landingNavbar.features")}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-white md:text-[#1E2630] text-md font-medium md:hover:text-[#63A7D4]">
                  {t("landingNavbar.howItWorks")}
                </a>
              </li>
              <li>
                <a href="#community" className="text-white md:text-[#1E2630] text-md font-medium md:hover:text-[#63A7D4]">
                  {t("landingNavbar.community")}
                </a>
              </li>
              <li className="max-lg:hidden">
                <a href="#pricing" className="text-white md:text-[#1E2630] text-md font-medium md:hover:text-[#63A7D4]">
                  {t("landingNavbar.pricing")}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white md:text-[#1E2630] text-md font-medium md:hover:text-[#63A7D4]">
                  {t("landingNavbar.faq")}
                </a>
              </li>
            </ul>
          </nav>

          {/* Right: Language Selector & Auth Buttons */}
          <div className="flex max-md:w-2/3 justify-end items-center space-x-4">
            <select
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              value={i18n.language}
              className="px-4 py-2 text-sm font-medium text-black rounded-lg outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>

            <a href="#download" className="border hidden lg:block text-[#1E2630] text-md font-medium border-[#418BBB] rounded-sm p-2">
              {t("landingNavbar.download")}
            </a>

            {/* Sign In Button */}
            <Link href="/Signin">
              <button className="border border-[#418BBB] rounded-sm bg-[#418BBB] px-4 py-2 text-white hover:bg-[#357AA0]">
                {t("landingNavbar.signIn")}
              </button>
            </Link>
          </div>


        </div>
      </div>
    </header>
  );
};

export default Navbar;
