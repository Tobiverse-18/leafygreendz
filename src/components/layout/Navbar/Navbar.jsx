import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("leafygreendz-theme") === "dark";
  });

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("leafygreendz-theme", theme);
  }, [isDarkMode]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setIsDarkMode((current) => !current);
  };

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar__container">

        {/* Logo */}
        <Link
          to="/"
          className="navbar__logo"
          onClick={closeMenu}
        >
          LEAFYGREENDZ
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="navbar__desktop-nav"
          aria-label="Main navigation"
        >
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/books">
            Books
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

          <NavLink to="/contact">
            Contact
          </NavLink>
        </nav>

        {/* Navbar Actions */}
        <div className="navbar__actions">

          {/* Search */}
          <button
            type="button"
            className="navbar__icon-button"
            aria-label="Search"
          >
            <Search size={19} strokeWidth={1.7} />
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="navbar__icon-button"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={19} strokeWidth={1.7} />
          </Link>

          {/* Account */}
          <Link
            to="/account"
            className="navbar__icon-button"
            aria-label="Account"
          >
            <UserRound size={19} strokeWidth={1.7} />
          </Link>

          {/* Desktop Theme */}
          <button
            type="button"
            className="navbar__icon-button navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={
              isDarkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <Sun size={19} strokeWidth={1.7} />
            ) : (
              <Moon size={19} strokeWidth={1.7} />
            )}
          </button>

          {/* Hamburger */}
          <button
            type="button"
            className="navbar__menu-toggle"
            onClick={toggleMenu}
            aria-label={
              isMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={23} strokeWidth={1.7} />
            ) : (
              <Menu size={23} strokeWidth={1.7} />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`navbar__mobile-menu ${
          isMenuOpen
            ? "navbar__mobile-menu--open"
            : ""
        }`}
      >
        <nav
          className="navbar__mobile-nav"
          aria-label="Mobile navigation"
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/books"
            onClick={closeMenu}
          >
            Books
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </nav>

        <div className="navbar__mobile-divider" />

        <div className="navbar__mobile-secondary">

          <Link
            to="/account"
            onClick={closeMenu}
          >
            <UserRound
              size={18}
              strokeWidth={1.7}
            />
            Account
          </Link>

          <Link
            to="/cart"
            onClick={closeMenu}
          >
            <ShoppingBag
              size={18}
              strokeWidth={1.7}
            />
            Cart
          </Link>

          {/* Mobile Theme */}
          <button
            type="button"
            className="navbar__mobile-theme"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <Sun
                size={18}
                strokeWidth={1.7}
              />
            ) : (
              <Moon
                size={18}
                strokeWidth={1.7}
              />
            )}

            {isDarkMode
              ? "Light mode"
              : "Dark mode"}
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;