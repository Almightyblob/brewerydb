import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SearchBar = props => {
  const history = useHistory();
  useEffect(() => {
    fetchItems();
  }, []);
  const [locations, setLocations] = useState([]);
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
  };

  const locationSelectHandler = async event => {
    let countrycode = event.target.value;
    props.updateCountrycode(countrycode);
    history.push(`/breweries/`);
  };

  return (
    <div>
      <label htmlFor="countries">Select a country</label>
      <select name="countries" id="countries" onChange={locationSelectHandler}>
        <option value=""> </option>
        {locations.map(country => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
