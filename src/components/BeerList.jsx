import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// const _ = require("lodash");

const BeerList = props => {
  const history = useHistory();
  const [beers = props.beers, setBeers] = useState();
  if (beers) {
    console.log(beers.name);
  }

  return (
    <div className="contentcontainer">
      <h1 className="title">Beers</h1>
      {beers && Array.isArray(beers) ? (
        beers.map(beer => (
          <div
            className="listitem"
            key={beer.id}
            onClick={() => history.push(`/beer/${beer.id}`)}
          >
            <p>{beer.name}</p>
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

export default BeerList;
