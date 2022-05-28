import React from "react";
import "./RenderedMeals.css";
import { Link } from "react-router-dom";
import { LocationIcon } from "./svg/LocationIcon";
import { PriceIcon } from "./svg/PriceIcon";
import { CalendarIcon } from "./svg/CalendarIcon";

export const RenderedMeal = (props) => {
  return (
    <Link className="mealLink" to={"meals/" + props.meal.id}>
      <li className="meal">
        <h3>{props.meal.title}</h3>
        <div className="flex">
          <p className="location marginRight">
            <LocationIcon />
            {props.meal.location}
          </p>
          <p className="price">
            <PriceIcon />
            {props.meal.price} DKK
          </p>
        </div>

        <p className="date">
          <CalendarIcon />
          {props.meal.when
            .split("T")
            .join(" ")
            .slice(0, props.meal.when.length - 8)}
        </p>
        <p className="marginTop">{props.meal.description}</p>
      </li>
    </Link>
  );
};
