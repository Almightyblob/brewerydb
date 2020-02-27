import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import axios from "axios";
import Searchbar from "./components/Searchbar";
import BreweryContainer from "./components/BreweryContainer";
import BreweryDetail from "./components/BreweryDetail";
import Home from "./components/Home";
import "./App.css";

const App = props => {
  const [countrycode, setCountrycode] = useState();

  const updateCountrycode = countrycode => {
    setCountrycode(countrycode);
    console.log("APP:", countrycode);
  };

  return (
    <Router>
      <div className="App">
        <Searchbar updateCountrycode={updateCountrycode} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/breweries/"
            component={() => <BreweryContainer countrycode={countrycode} />}
          />
          <Route
            exact
            path="/breweries/brewery/:id"
            component={BreweryDetail}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
