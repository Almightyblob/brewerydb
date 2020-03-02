import React, { useEffect, useState } from "react";
import axios from "axios";

const BeerDetail = props => {
  useEffect(() => {
    fetchItems();
  }, []);

  const [beer, setBeer] = useState();

  const fetchItems = async () => {
    const beerResponse = await axios.get(
      `http://localhost:3000/beer/${props.match.params.id}/?key=659d5c6b8f3d2447f090119e48202fdb`
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
              <div className="beerlabelcontainer">
                <h4>(No image available)</h4>
              </div>
            )}
            <h3>Description</h3>
            <p>
              <b>{beer.style.shortName}:</b> {beer.style.description}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinnercontainer">
        <img src="/spinner.gif" alt="" />
      </div>
    );
  }
};

export default BeerDetail;
