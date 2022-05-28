import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MealsContext } from "../MealsContext";
import { Page404 } from "../Page404/Page404";
import { CalendarIcon } from "../svg/CalendarIcon";
import { LocationIcon } from "../svg/LocationIcon";
import { PriceIcon } from "../svg/PriceIcon";
import { DeleteMeal } from "../DeleteMeal";

export const RenderAMeal = (props) => {
  const contextValues = useContext(MealsContext);
  const exactMeal = props.results.find(
    (meal) => parseInt(meal.id) == parseInt(props.id)
  );
  return (
    <>
      {contextValues.isLoading ? (
        <p className="message">Loading...</p>
      ) : (
        <div className="resultContainer">
          {exactMeal ? (
            <div className="mealProfile">
              <h1 className="thin-heading greenHeading">{exactMeal.title}</h1>
              <div className="shortInfo">
                <div className="centeredFlex flex">
                  <p>
                    <LocationIcon />
                    {exactMeal.location}
                  </p>
                  <p>
                    <PriceIcon />
                    {exactMeal.price}DKK
                  </p>
                </div>
                <p className="center">
                  <CalendarIcon />
                  {exactMeal.when
                    .split("T")
                    .join(" ")
                    .slice(0, exactMeal.when.length - 8)}
                </p>
                <p className="center marginTop">{exactMeal.description}</p>
              </div>
              <div className="flex-buttons">
                <Link to="/">
                  <button className="ghostButton">Back to the Homepage</button>
                </Link>
                <DeleteMeal className="red" />
              </div>
            </div>
          ) : (
            <Page404 />
          )}
        </div>
      )}
    </>
  );
};
