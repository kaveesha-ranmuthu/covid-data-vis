import React from "react";
import { useGlobalContext } from "./context";
import countries from "./countries";

const CountryList = () => {
  const { setCountry, graphLoading } = useGlobalContext();
  const handleSelect = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
  };
  return (
    <div>
      <select
        name="countryList"
        id="countryList"
        size="25"
        className={graphLoading ? "select-load select" : "select"}
        onChange={handleSelect}
        defaultValue="all"
      >
        <option value="all">Global</option>
        {countries.map((country, index) => {
          return (
            <option key={index} value={country.abbrv}>
              {country.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CountryList;
