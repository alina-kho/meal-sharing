import React from "react";
import "./AddMeal.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const AddMeal = () => {
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    location: "",
    when: null,
    maxReservations: null,
    price: null,
  });

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setInputValues((setInputValues) => ({ ...inputValues, [key]: value }));
  };

  //This is done in accrodance with the data model provided in the backend for the post request
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Extra validation is added to avoid 504 error and app crash
    if (
      inputValues.title !== "" &&
      inputValues.description !== "" &&
      inputValues.location !== "" &&
      inputValues.maxReservations !== null &&
      inputValues.price !== null &&
      inputValues.when !== null
    ) {
      const newMeal = {
        title: inputValues.title,
        description: inputValues.description,
        location: inputValues.location,
        when: inputValues.when,
        maxReservations: inputValues.maxReservations,
        price: inputValues.price,
      };

      try {
        const response = await fetch("api/meals/", {
          method: "POST",
          body: JSON.stringify(newMeal),
          headers: {
            "Content-type": "application/json",
          },
        });
        if (response.ok) {
          alert("Your meal has been added");
          return response;
        } else {
          alert(`Something went wrong: ${response.status}. Please try again`);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("You should fill out all the fields");
      return;
    }
  };

  return (
    <div className="add-meal">
      <h1 className="thin-heading">Add a New Meal</h1>
      <p>If you want to share a meal with others, fill out the form below.</p>
      <form>
        <div className="add-form">
          <label>
            Title
            <input
              type="text"
              name="title"
              onChange={handleInput}
              required
            ></input>
          </label>
          <label>
            Description{" "}
            <input
              type="text"
              name="description"
              onChange={handleInput}
              required
            ></input>
          </label>
          <label>
            Location{" "}
            <input
              type="text"
              name="location"
              onChange={handleInput}
              required
            ></input>
          </label>
          <label>
            When{" "}
            <input
              type="datetime-local"
              name="when"
              onChange={handleInput}
              required
            ></input>
          </label>
          <label>
            Price{" "}
            <input
              type="number"
              name="price"
              onChange={handleInput}
              required
            ></input>
          </label>
          <label>
            Max. reservations{" "}
            <input
              type="number"
              name="maxReservations"
              onChange={handleInput}
              required
            ></input>
          </label>
        </div>
        <div className="flex-buttons">
          <Link to="/" className="ghostButton">
            <button className="ghostButton" id="back">
              Back to the Homepage
            </button>
          </Link>
          <button className="mainButton" onClick={handleSubmit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
