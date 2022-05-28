import React, { useContext } from "react";
import "./RenderedMeals.css";
import { RenderedMeal } from "./RenderedMeal";
import { MealsContext } from "./MealsContext";

export const RenderedResults = () => {
  const contextValues = useContext(MealsContext);
  return (
    <>
      {contextValues.isLoading ? (
        <p className="message">Loading...</p>
      ) : (
        <div className="results">
          <ul className="grid">
            {contextValues.meals.length > 0 ? (
              contextValues.meals.map((meal) => {
                return <RenderedMeal key={meal.id} meal={meal} />;
              })
            ) : (
              <p className="message">No meals found</p>
            )}
          </ul>
        </div>
      )}
    </>
  );
};
