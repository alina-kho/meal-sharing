import React, { useEffect } from "react";
import { useContext, useState } from "react";

//Logic behind this component:

export const MealsContext = React.createContext();

export const MealsContextProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const contextValues = {
    meals,
    setMeals,
    isLoading,
    setIsLoading,
    error,
    setError,
    availableMeals,
    setAvailableMeals,
  };

  return (
    <MealsContext.Provider value={contextValues}>
      {children}
    </MealsContext.Provider>
  );
};
