import React from "react";
import "./AddMeal.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const AddMeal = () => {
  const [inputValues, setInputValues] = useState({});

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setInputValues((setInputValues) => ({ ...inputValues, [key]: value }));
  };

  //This is done in accrodance with the data model provided in the backend for the post request
  const handleSubmit = (e) => {
    const newMeal = {
      title: inputValues.title,
      description: inputValues.description,
      location: inputValues.location,
      when: inputValues.when,
      maxReservations: inputValues.maxReservations,
      price: inputValues.price,
    };

    fetch("api/meals/", {
      method: "POST",
      body: JSON.stringify(newMeal),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Your meal has been added");
        setInputValues({});
        return response.json();
      } else {
        alert("Something went wrong. Please try again");
        return;
      }
    });
  };

  return (
    <div className="add-meal">
      <h1 className="thin-heading">Add a New Meal</h1>
      <p>If you want to share a meal with others, fill out the form below.</p>
      <form className="add-form">
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
      </form>
      <div className="flex-buttons">
        <Link to="/">
          <button className="ghostButton">Back to the Homepage</button>
        </Link>
        <button className="mainButton" onClick={handleSubmit} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};
