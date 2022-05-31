import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MealsContext } from "../MealsContext";
import { RenderedResults } from "../RenderedResults";
import "./Home.css";

export const Home = () => {
  const contextValues = useContext(MealsContext);

  async function fetchAllMeals() {
    const fetchedData = await fetch("/api/meals?availableReservations=true");
    const response = await fetchedData.json();
    contextValues.setIsLoading(false);
    contextValues.setMeals(response);
  }

  useEffect(() => {
    contextValues.setIsLoading(true);
    try {
      fetchAllMeals();
    } catch (error) {
      contextValues.setErorr(error.message);
      console.error(error);
    }
  }, []);

  // console.log(contextValues.meals);

  return (
    <>
      <div className="banner">
        <div className="bannerText">
          <h1>Welcome to Meal to Share</h1>
          <h2>Share your meal with others</h2>
          <button>
            <Link className="mainButton" to="/add-meal">
              GET STARTED
            </Link>
          </button>
        </div>
      </div>
      <div className="meals">
        <h2 className="thin-heading greenHeading">
          Explore the meals available
        </h2>
        <RenderedResults />
      </div>
    </>
  );
};
