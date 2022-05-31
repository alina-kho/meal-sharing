import React from "react";
import { useState } from "react";
import "./MakeReservation.css";

export const MakeReservation = (props) => {
  const [inputValues, setInputValues] = useState({
    contactPhonenumber: "",
    contactName: "",
    contactEmail: "",
  });

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setInputValues((inputValues) => ({ ...inputValues, [key]: value }));
  };
  console.log(inputValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Adding extra validation to avoid 504 error and app crash
    if (
      inputValues.contactEmail !== "" &&
      inputValues.contactPhonenumber !== "" &&
      inputValues.contactName !== ""
    ) {
      const newBooking = {
        numberOfGuests: 1,
        mealId: props.id,
        contactPhonenumber: inputValues.contactPhonenumber,
        contactName: inputValues.contactName,
        contactEmail: inputValues.contactEmail,
      };
      try {
        const response = await fetch("api/reservations/", {
          method: "POST",
          body: JSON.stringify(newBooking),
          headers: {
            "Content-type": "application/json",
          },
        });
        if (response.ok) {
          alert("You have got the spot!");
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
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
