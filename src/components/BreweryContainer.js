import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// const _ = require("lodash");

const BreweryContainer = props => {
  const history = useHistory();
  useEffect(() => {
    fetchItems();
  }, [props.countrycode]);
  const [breweries, setBreweries] = useState();
  const fetchItems = async () => {
    const response = await axios.get(
      `http://localhost:3000/locations/?countryIsoCode=${props.countrycode}&key=659d5c6b8f3d2447f090119e48202fdb`
    );
    const brewerieData = response.data;
    setBreweries(brewerieData.data);
    console.log(brewerieData.data);
  };

  return (
    <div>
      <h1>BREWERIES {props.countrycode}</h1>
      {breweries && Array.isArray(breweries) ? (
        breweries.map(item => (
          <div onClick={() => history.push(`brewery/${item.breweryId}`)}>
            <p>
              {item.brewery.name}, {item.name}
            </p>
          </div>
        ))
      ) : (
        <p> nothing to show </p>
      )}
    </div>
  );
};

export default BreweryContainer;
