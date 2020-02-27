import React, { useEffect, useState } from "react";
import axios from "axios";

const BreweryDetail = props => {
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
  return (
    <div>
      <h1>{brewery && brewery ? brewery.name : "LOADING"}</h1>
      {beers ? (
        beers.map(beer => <p>{beer.name}</p>)
      ) : (
        <p>loading list of beers</p>
      )}
    </div>
  );
};

export default BreweryDetail;
