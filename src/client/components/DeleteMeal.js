import React from "react";
import { useHistory, useParams } from "react-router-dom";

export const DeleteMeal = () => {
  const { id } = useParams();
  const browseHistory = useHistory();
  const handleDelete = () => {
    fetch(`api/meals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("The meal has been deleted!");
        browseHistory.push("/meals");
        return response.json();
      } else {
        alert("Something went wrong. Please try again");
        return;
      }
    });
  };
  return (
    <button className="ghostButton red" onClick={handleDelete}>
      Delete Meal
    </button>
  );
};
