import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navClass = ({ isActive }) => isActive ? "nav-link active" : "nav-link";
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="app-navbar">
      <div className="nav-container">
        <NavLink className="navbar-brand" to="/home" onClick={closeMenu}>
          <span className="brand-mark">M</span>
          <span>MERN</span>
        </NavLink>

        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={menuOpen ? "nav-menu open" : "nav-menu"}>
          <NavLink className={navClass} to="/home" onClick={closeMenu}>Home</NavLink>
          <NavLink className={navClass} to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink className={navClass} to="/contact" onClick={closeMenu}>Contact</NavLink>
          <NavLink className={navClass} to="/course" onClick={closeMenu}>Course</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
