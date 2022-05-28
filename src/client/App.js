import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { About } from "./components/About";
import { Navbar } from "./components/Navbar/Navbar.js";
import { Home } from "./components/Home/Home";
import { AddMeal } from "./components/AddMeal/AddMeal";
import { Page404 } from "./components/Page404/Page404";
import { Footer } from "./components/Footer/Footer";
import { Meals } from "./components/Meals/Meals.js";
import { MealsContextProvider } from "./components/MealsContext";
import { MealById } from "./components/MealPage/MealById";

function App() {
  return (
    <MealsContextProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>
          {/* <Route exact path="/about" component={About}></Route> */}
          <Route exact path="/add-meal" component={AddMeal}></Route>
          <Route exact path="/meals" component={Meals}></Route>
          <Route exact path="/meals/:id" component={MealById}></Route>
          <Route component={Page404} />
        </Switch>
        <Footer />
      </Router>
    </MealsContextProvider>
  );
}

export default App;
