import React, { useEffect, useState } from "react";
import "./Meal.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MealsContext } from "../MealsContext";
import { RenderAMeal } from "./RenderAMeal";
import { MakeReservation } from "../MakeReservation/MakeReservation";
import { DeleteMeal } from "../DeleteMeal";

export const MealById = () => {
  const [results, setResults] = useState([]);
  const [mealsAvailable, setMealsAvailable] = useState([]);
  const contextValues = useContext(MealsContext);
  const { id } = useParams();

  async function fetchAMeal() {
    const fetchedData = await fetch("/api/meals/" + id);
    const response = await fetchedData.json();
    contextValues.setIsLoading(false);
    setResults(response);
  }

  async function fetchAvailableMeals() {
    const fetchedData = await fetch("api/meals?availableReservations=true");
    const response = await fetchedData.json();
    contextValues.setIsLoading(false);
    setMealsAvailable(response);
  }

  useEffect(() => {
    contextValues.setIsLoading(true);
    try {
      fetchAMeal();
      fetchAvailableMeals();
    } catch (error) {
      contextValues.setErorr(error.message);
      console.error(error);
    }
  }, []);

  console.log(mealsAvailable);
  console.log(results);

  return (
    <div className="meal-page">
      <div className="meal-info">
        <RenderAMeal results={results} id={id} />
      </div>

      {mealsAvailable.find((meal) => parseInt(meal.id) === parseInt(id)) ? (
        <MakeReservation id={id} />
      ) : (
        <div className="noSpotsContainer">
          <div className="noSpotsMessage">
            <h3 className="center">No spots left for this meal, sorry...</h3>
            <button className="noSpotsAlign redButton">
              <Link className="mainButton" to="/meals">
                Back to Meals
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
