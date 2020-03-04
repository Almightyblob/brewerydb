import React from "react";

const Home = props => {
  const showBeer = () => {};

  return (
    <div className="contentcontainer">
      <h1 className="title">WELCOME</h1>
      <div className="thickborder">
        <div className="beercontainer">
          <p>
            Please allow the app to initially load some data, it should only
            take a few seconds
          </p>
          <p>
            Use the search bar above to find breweries listed by countries, or
            beers filtered by name, type or location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
