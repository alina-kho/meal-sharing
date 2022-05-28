import React, { useState } from "react";
import "./Meals.css";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MealsContext } from "../MealsContext";
import { RenderedResults } from "../RenderedResults";

export const Meals = () => {
  const contextValues = useContext(MealsContext);
  const [inputValue, setInputValue] = useState("");

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  async function fetchAllMeals() {
    if (inputValue == "") {
      const fetchedData = await fetch("/api/meals");
      const response = await fetchedData.json();
      contextValues.setIsLoading(false);
      contextValues.setMeals(response);
    } else {
      const fetchedData = await fetch("/api/meals?title=" + String(inputValue));
      const response = await fetchedData.json();
      contextValues.setIsLoading(false);
      contextValues.setMeals(response);
    }
  }

  useEffect(() => {
    contextValues.setIsLoading(true);
    fetchAllMeals();
  }, [inputValue]);

  return (
    <div className="centered-div">
      <h1 className="thin-heading greenHeading">Shared meals</h1>
      <input
        className="searchBar"
        type="text"
        onChange={inputHandler}
        placeholder="Search a meal by its title"
      ></input>
      <div>
        <RenderedResults />
      </div>
      <div className="callToAction">
        <div className="callToActionText">
          <h3 className="greenHeading">Have a meal to share?</h3>
          <p>Let's arrange it!</p>
          <button>
            <Link className="mainButton" to="/add-meal">
              ADD MEAL
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
