import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

let allBeers = [];

const SearchBar = props => {
  const [locations, setLocations] = useState([]);
  const [beerSearchTerm, setBeerSearchTerm] = useState("");
  let [pageCount, setPageCount] = useState(0);
  const [beerPages, setBeerPages] = useState([]);
  const [beers, setBeers] = useState([]);
  const history = useHistory();
  useEffect(() => {
    fetchItems();
  }, []);

  //   const [state, setState] = useState([]);
  const fetchItems = async () => {
    const response = await axios.get(
      "http://localhost:3000/locations/?key=659d5c6b8f3d2447f090119e48202fdb"
    );
    const locationData = response.data;
    const unique = [
      ...new Set(locationData.data.map(item => item.countryIsoCode))
    ];
    setLocations(unique);

    //   Collect all beers
    const firstBeerResponse = await axios.get(
      "http://localhost:3000/beers/?withBreweries=Y&key=659d5c6b8f3d2447f090119e48202fdb"
    );
    allBeers.push(firstBeerResponse.data);
    setPageCount(pageCount++);

    for (let i = 2; i <= firstBeerResponse.data.numberOfPages; i++) {
      await setTimeout(getBeers(i), 150);
    }
  };
  const getBeers = async page => {
    let beerResponse = await axios.get(
      `http://localhost:3000/beers/?withBreweries=Y&p=${page}&key=659d5c6b8f3d2447f090119e48202fdb`
    );
    allBeers.push(beerResponse.data);
    setPageCount(pageCount++);
  };

  /// set beer state once all data is loaded
  if (
    allBeers.length > 0 &&
    allBeers.length === allBeers[0].numberOfPages &&
    beerPages.length === 0
  ) {
    let unwoundData = [];
    allBeers.forEach(page => unwoundData.push(page.data));
    allBeers = _.flatten(unwoundData);
    props.updateBeers(allBeers);
  }

  const breweryLocationHandler = async event => {
    let countrycode = event.target.value;
    props.updateCountrycode(countrycode);
    history.push(`/breweries/`);
  };

  const updateBeerHandler = async () => {
    let searchResult = allBeers.filter(beer =>
      beer.name.toLowerCase().includes(beerSearchTerm.toLowerCase())
    );
    props.updateBeers(searchResult);
    history.push("/beers/");
  };

  const beerLocationHandler = async event => {
    let searchResult = allBeers.filter(beer =>
      beer.breweries[0].locations[0].countryIsoCode.includes(event.target.value)
    );
    props.updateBeers(searchResult);
    console.log("search result ", beerSearchTerm, searchResult);
    history.push("/beers/");
  };

  const beerSearchHandler = async event => {
    setBeerSearchTerm(event.target.value);
    console.log(beerSearchTerm);
  };

  return (
    <div className="searchbar">
      {}
      {allBeers.length < 23 && allBeers.length > 0 ? (
        <div>
          <p>
            Please wait while loading Beers ({pageCount} of {""}
            {allBeers[0].numberOfPages})
          </p>
        </div>
      ) : (
        <div>
          <label htmlFor="countries">Display Breweries by country</label>
          <select
            name="countries"
            id="countries"
            onChange={breweryLocationHandler}
          >
            <option value=""> </option>
            {locations.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <label htmlFor="countries">Find beer by name</label>
          <input type="text" onChange={beerSearchHandler} />
          <button onClick={updateBeerHandler}>Get Beer Data</button>
          <label htmlFor="countries">Display Beers by country</label>
          <select
            name="countries"
            id="countries"
            onChange={beerLocationHandler}
          >
            <option value=""> </option>
            {locations.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
