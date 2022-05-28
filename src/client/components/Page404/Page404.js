import React from "react";
import "./Page404.css";
import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <div className="pageContainer">
      <div className="textContainer">
        <h1>Oops, something went wrong...</h1>
        <h2>Looks like this page doesn't exist yet</h2>
        <button>
          <Link className="mainButton" to="/">
            Go to the Homepage
          </Link>
        </button>
      </div>
    </div>
  );
};
