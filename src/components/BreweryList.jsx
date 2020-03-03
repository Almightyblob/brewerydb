import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

const BreweryList = props => {
  const history = useHistory();
  const [breweries, setBreweries] = useState();

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        `http://localhost:3000/locations/?countryIsoCode=${props.countrycode}&order=breweryName&key=659d5c6b8f3d2447f090119e48202fdb`
      );
      let breweryData = response.data.data;
      let unique = [];
      if (breweryData) {
        unique = _.uniqBy(breweryData, "breweryId");
      }
      setBreweries(unique);
      console.log(unique);
    }
    fetchData();
  }, []);

  return (
    <div className="contentcontainer">
      <h1 className="title">BREWERIES {props.countrycode}</h1>
      {breweries && Array.isArray(breweries) ? (
        breweries.map(item => (
          <div
            className="listitem"
            key={item.id}
            onClick={() => history.push(`brewery/${item.breweryId}`)}
          >
            <p>{item.brewery.name}</p>
          </div>
        ))
      ) : (
        <div className="spinnercontainer">
          <img src="/spinner.gif" alt="" />
        </div>
      )}
    </div>
  );
};

export default BreweryList;
