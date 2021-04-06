import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext();

const countryURL = "https://covid-193.p.rapidapi.com/history?country=";

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [country, setCountry] = useState("all");
  const [graphLoading, setGraphLoading] = useState(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setGraphLoading(true);
        const resp = await fetch(countryURL + country, {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "de391ddabbmshd22b874f8441d03p19ec10jsn6e78ed0e7b0e",
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
          },
        });
        const respData = await resp.json();
        setGraphLoading(false);
        const unique = respData.response.reduce(
          (acc, a) => acc.concat(acc.find((b) => b.day === a.day) ? [] : [a]),
          []
        );
        setCountryData(unique.reverse());
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountryData();
  }, [country]);

  useEffect(() => {
    document.title = "COVID-19 Data Visualisation";
  }, []);

  return (
    <AppContext.Provider
      value={{
        country,
        setCountry,
        countryData,
        isLoading,
        graphLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
