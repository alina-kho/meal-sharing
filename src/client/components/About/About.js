import React from "react";
import "./About.css";
import image from "./about.png";

export const About = () => {
  return (
    <div className="about">
      <article>
        <h1 className="greenHeading thin-heading">About the project</h1>
        <p>
          <span className="green-span">Meal to Share</span> is a platform for
          sharing meals. Do you feel like inviting others over for a dinner or
          do you like to explore new dishes? Then{" "}
          <span className="green-span">Meal to Share</span> is a right spot!
        </p>
      </article>
    </div>
  );
};
