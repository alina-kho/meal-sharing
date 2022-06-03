import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { InstagramIcon } from "./svg/Instagram";
import { FacebookIcon } from "./svg/Facebook";

export const Footer = () => {
  return (
    <footer>
      <section>
        <ul>
          <li>
            <Link to="/" className="footerLink">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="footerLink">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/meals" className="footerLink">
              Meals
            </Link>
          </li>
        </ul>
      </section>
      <section className="socialMedia">
        <h3>Follow us online</h3>
        <ul>
          <li>
            <InstagramIcon />
          </li>
          <li>
            <FacebookIcon />
          </li>
        </ul>
      </section>
    </footer>
  );
};
