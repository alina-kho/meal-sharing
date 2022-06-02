import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "./logo.png";

export const Navbar = () => {
  return (
    <header className="mobile-header">
      <Link to="/">
        <img alt="logo" src={logo} id="logo"></img>
      </Link>

      <nav>
        <ul>
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="link">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/meals" className="link">
              Meals
            </Link>
          </li>
          <li>
            <Link to="/add-meal" className="link">
              Add meal
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
