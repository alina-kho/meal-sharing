import React from "react";
import { useState } from "react";
import "./MakeReservation.css";

export const MakeReservation = (props) => {
  const [inputValues, setInputValues] = useState({});

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setInputValues((inputValues) => ({ ...inputValues, [key]: value }));
  };

  const handleSubmit = (e) => {
    const newBooking = {
      numberOfGuests: 1,
      mealId: props.id,
      contactPhonenumber: inputValues.contactPhonenumber,
      contactName: inputValues.contactName,
      contactEmail: inputValues.contactEmail,
    };

    fetch("api/reservations/", {
      method: "POST",
      body: JSON.stringify(newBooking),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("You have got the spot!");
        setInputValues({});
        return response.json();
      } else {
        alert("Something went wrong. Please try again");
      }
    });
  };

  return (
    <div className="reservation-form-wrapper">
      <div className="reservation-form-container">
        <h2 className="greenHeading">Book yourself a spot</h2>
        <p className="italics">Fill out a short form below</p>
        <form className="flex-form">
          <label>
            Contact Name
            <input
              type="text"
              required
              name="contactName"
              onChange={handleInput}
            ></input>
          </label>
          <label>
            Contact Phone
            <input
              type="text"
              required
              name="contactPhonenumber"
              onChange={handleInput}
            ></input>
          </label>
          <label>
            Contact Email
            <input
              type="email"
              required
              name="contactEmail"
              onChange={handleInput}
            ></input>
          </label>
        </form>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
