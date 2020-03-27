import React from "react";
import Forms from "./components/Forms";
import HomePage from "./components/HomePage";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1>Lambda Eats</h1>
      <Route  exact path="/">
      <HomePage />
      </Route>
      <Route path="/pizza">
      <Forms />
      </Route>
      
      
    </div>
  );
};
export default App;
