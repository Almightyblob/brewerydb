import React from "react";

const Home = props => {
  const showBeer = () => {
    console.log(props.beer);
  };

  return (
    <div>
      {props.beers && props.beers ? (
        <button onClick={showBeer}>Show Beer</button>
      ) : (
        <h1>WELCOME</h1>
      )}
    </div>
  );
};

export default Home;
