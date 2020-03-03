import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

let allBeers = [];

const SearchBar = props => {
  const [locations, setLocations] = useState([]);
  const [breweryNameSearchTerm, setBreweryNameSearchTerm] = useState("");
  const [beerNameSearchTerm, setBeerNameSearchTerm] = useState("");
  const [beerTypeSearchTerm, setBeerTypeSearchTerm] = useState("");
  let [pageCount, setPageCount] = useState(0);
  const [beerPages, setBeerPages] = useState([]);
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

    //   Collect all beers from API
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

  // populate allBeer array once all data is loaded
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

  const breweryNameSearch = async () => {
    let breweryResponse = await axios.get(
      `http://localhost:3000/breweries/?name=${breweryNameSearchTerm}&key=659d5c6b8f3d2447f090119e48202fdb`
    );
    props.breweryNameSearch(breweryResponse.data);
    history.push(`/breweries/`);
  };

  const breweryLocationHandler = async event => {
    let countrycode = event.target.value;
    props.updateCountrycode(countrycode);
    history.push(`/breweries/`);
  };

  const beerNameSearch = async () => {
    let searchResult = allBeers.filter(beer =>
      beer.name.toLowerCase().includes(beerNameSearchTerm.toLowerCase())
    );
    props.updateBeers(searchResult);
    history.push("/beers/");
  };

  const beerTypeSearch = async () => {
    let searchResult = allBeers.filter(beer => {
      if (beer.style) {
        return beer.style.name
          .toLowerCase()
          .includes(beerTypeSearchTerm.toLowerCase());
      }
    });
    props.updateBeers(searchResult);
    history.push("/beers/");
  };

  const beerLocationHandler = async event => {
    let searchResult = allBeers.filter(beer =>
      beer.breweries[0].locations[0].countryIsoCode.includes(event.target.value)
    );
    props.updateBeers(searchResult);
    history.push("/beers/");
  };

  const beerNameInputHandler = async event => {
    setBeerNameSearchTerm(event.target.value);
  };

  const beerTypeInputHandler = async event => {
    setBeerTypeSearchTerm(event.target.value);
  };

  const clearBeerSearch = () => {
    setBeerNameSearchTerm("");
    setBeerTypeSearchTerm("");
    props.updateBeers(allBeers);
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
        <div className="searchelements">
          <div className="dropdown brewerysearch">
            <button className="dropbutton">Search Breweries</button>
            <div className="dropdowncontent">
              <label htmlFor="countries">Display Breweries by country</label>
              <select
                name="countries"
                id="countries"
                onChange={breweryLocationHandler}
                value={breweryNameSearchTerm}
              >
                <option value=""> </option>
                {locations.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="dropdown beersearch">
            <button className="dropbutton">Search Beers</button>
            <div className="dropdowncontent">
              <div className="searchelement">
                <label htmlFor="beername">Find beer by name</label>
                <input
                  type="text"
                  name="beername"
                  onChange={beerNameInputHandler}
                  value={beerNameSearchTerm}
                />
                <button className="searchbutton" onClick={beerNameSearch}>
                  Search Name
                </button>
              </div>
              <div className="searchelement">
                <label htmlFor="beertype">Find beer by type</label>
                <input
                  type="text"
                  name="beertype"
                  onChange={beerTypeInputHandler}
                  value={beerTypeSearchTerm}
                />
                <button className="searchbutton" onClick={beerTypeSearch}>
                  Search Type
                </button>
              </div>
              <div className="searchelement">
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
              <button className="searchbutton" onClick={clearBeerSearch}>
                Reset Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
