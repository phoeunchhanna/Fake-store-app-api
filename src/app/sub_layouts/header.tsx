"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white">
      <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🛒</span>
          <span className="text-xl font-bold">Fake Store</span>
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white focus:outline-none"
        >
          {menuOpen ? (
            // ❌ Close icon
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
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
          ) : (
            // ☰ Hamburger icon
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Links */}
        <div className={`${menuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 font-medium">
            <li>
              <a href="/" className="block py-2 px-3 hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#products" className="block py-2 px-3 hover:text-blue-400 transition">
                Products
              </a>
            </li>
            <li>
              <a href="#about" className="block py-2 px-3 hover:text-blue-400 transition">
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
