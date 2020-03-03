import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const BeerDetail = props => {
  const history = useHistory();
  useEffect(() => {
    fetchItems();
  }, []);

  const [beer, setBeer] = useState();

  const fetchItems = async () => {
    const beerResponse = await axios.get(
      `http://localhost:3000/beer/${props.match.params.id}/?withBreweries=Y&key=659d5c6b8f3d2447f090119e48202fdb`
    );
    const beerData = beerResponse.data;
    console.log(beerData.data);
    setBeer(beerData.data);
  };
  if (beer) {
    return (
      <div className="contentcontainer">
        <div className="thickborder">
          <div className="beercontainer">
            <h1 className="title">{beer.name}</h1>
            {beer.labels ? (
              <div className="imgcontainer">
                <img
                  className="beerlabel"
                  src={beer.labels.medium}
                  alt="label"
                />
              </div>
            ) : (
              <div className="imgcontainer">
                <h4>(No image available)</h4>
              </div>
            )}
            <h3>Description</h3>

            <span>
              <b>Brewed by: </b>
            </span>
            <span
              className="listitem"
              onClick={() =>
                history.push(`/breweries/brewery/${beer.breweries[0].id}`)
              }
            >
              {beer.breweries[0].name}
            </span>

            <p>
              <b>{beer.style.name}:</b> {beer.style.description}
            </p>
            <div className="beerattributes">
              <p>
                <b>ABV: </b> {beer.abv}
              </p>
              <p>
                <b>IBU: </b> {beer.style.ibuMin} - {beer.style.ibuMax}
              </p>
            </div>
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

export default BeerDetail;
