import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
// import { Meals } from "../Meals";
// import { About } from "../About";

export const Navbar = () => {
  return (
    <header>
      <Link to="/">
        <Logo />
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
