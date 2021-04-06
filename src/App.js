import React from "react";
import Graph from "./Graph";
import CountryList from "./CountryList";
import Loading from "./Loading";
import { useGlobalContext } from "./context";
// import Buttons from "./Buttons";

function App() {
  const { isLoading } = useGlobalContext();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>COVID-19 Data Visualisation</h1>
      <div className="cont">
        <Graph />
        <CountryList />
      </div>
      {/* <Buttons /> */}
    </div>
  );
}

export default App;
