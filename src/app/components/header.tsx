"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, User, LogOut, Settings, ShoppingCart } from "lucide-react";
import { useCart } from "../context/cart_context"; // ✅ import

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { cart, removeFromCart, clearCart } = useCart(); // ✅ use global cart

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalItems = cart.reduce((sum, p) => sum + (p.quantity ?? 1), 0);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LEFT: LOGO */}
        <div className="nav-left">
          <div className="logo-icon">🛍️</div>
          <h1 className="logo-text">Fake API Store</h1>
        </div>

        {/* CENTER NAV */}
        <nav className="nav-center">
          <a href="/" className="nav-link active">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* RIGHT: CART + PROFILE */}
        <div className="nav-right">
          {/* 🛒 Cart Button */}
          <div className="cart-icon" onClick={() => setCartOpen(!cartOpen)}>
            <ShoppingCart size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>

          {/* Cart Dropdown */}
          {cartOpen && (
            <div className="cart-dropdown">
              <h4>Shopping Cart</h4>
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
              ) : (
                <ul>
                  {cart.map((p) => (
                    <li key={p.id}>
                      <Image src={p.image} alt={p.title} width={30} height={30} />
                      <span>{p.title}</span>
                      <span>x{p.quantity}</span>
                      <button onClick={() => removeFromCart(p.id)}>🗑️</button>
                    </li>
                  ))}
                </ul>
              )}
              {cart.length > 0 && (
                <button className="clear-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              )}
            </div>
          )}

          {/* Profile dropdown */}
          <div className="profile-section" ref={profileRef}>
            <button
              className="profile-btn"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Profile"
            >
              <Image src="/profile.png" alt="Profile" width={28} height={28} />
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <a href="#profile" className="dropdown-item"><User size={16} /> Profile</a>
                <a href="#settings" className="dropdown-item"><Settings size={16} /> Settings</a>
                <hr />
                <a href="#logout" className="dropdown-item logout"><LogOut size={16} /> Logout</a>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="/" className="nav-link active">Home</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#services" className="nav-link">Services</a>
        <a href="#pricing" className="nav-link">Pricing</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>
    </header>
  );
}
