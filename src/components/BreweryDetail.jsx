import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const BreweryDetail = props => {
  const history = useHistory();
  useEffect(() => {
    fetchItems();
  }, []);

  const [brewery, setBrewery] = useState();
  const [beers, setBeers] = useState();

  const fetchItems = async () => {
    const breweryResponse = await axios.get(
      `http://localhost:3000/brewery/${props.match.params.id}/?key=659d5c6b8f3d2447f090119e48202fdb`
    );
    const breweryData = breweryResponse.data;
    const beersResponse = await axios.get(
      `http://localhost:3000/brewery/${props.match.params.id}/beers/?key=659d5c6b8f3d2447f090119e48202fdb`
    );
    const beersData = beersResponse.data;
    console.log(breweryData.data);
    setBrewery(breweryData.data);
    console.log(beersData.data);
    setBeers(beersData.data);
  };

  if (brewery && brewery) {
    return (
      <div className="contentcontainer">
        <h1 className="title">{brewery.name}</h1>
        <p className="established">established: {brewery.established}</p>

        <a
          className="brewery-url"
          href={brewery.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>{brewery.website}</p>
        </a>
        <div className="imgcontainer">
          <img src={brewery.images.medium} alt="logo" />
        </div>
        <p>{brewery.description}</p>
        <div className="listcontainer">
          <h1 className="minortitle">List of Beers</h1>
          <div className="beerList">
            {beers ? (
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
              <p>loading list of beers</p>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="contentcontainer">
        <div className="spinnercontainer">
          <img src="/spinner.gif" alt="" />
        </div>
      </div>
    );
  }
};

export default BreweryDetail;
