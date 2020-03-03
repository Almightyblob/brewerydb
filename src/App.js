import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Searchbar from "./components/Searchbar";
import BreweryList from "./components/BreweryList";
import BreweryDetail from "./components/BreweryDetail";
import BeerDetail from "./components/BeerDetail";
import BeerList from "./components/BeerList";
import Home from "./components/Home";

const App = props => {
  const [countrycode, setCountrycode] = useState();
  const [breweries, setBreweries] = useState();
  const [beers, setBeers] = useState();

  const updateCountrycode = countrycode => {
    setCountrycode(countrycode);
    console.log("APP:", countrycode);
  };

  const breweryNameSearch = searchResults => {
    setBreweries(searchResults);
    console.log("APP:", searchResults);
  };

  const updateBeers = beers => {
    setBeers(beers);
    console.log("APP:", beers);
  };

  return (
    <Router>
      <div className="App">
        <Searchbar
          updateCountrycode={updateCountrycode}
          updateBeers={updateBeers}
          breweryNameSearch={breweryNameSearch}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/breweries/"
            component={() => <BreweryList countrycode={countrycode} />}
          />
          <Route
            exact
            path="/beers/"
            component={() => <BeerList beers={beers} />}
          />
          <Route
            exact
            path="/breweries/brewery/:id"
            component={BreweryDetail}
          />
          <Route exact path="/beer/:id" component={BeerDetail} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
