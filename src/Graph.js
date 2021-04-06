import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useGlobalContext } from "./context";
import months from "./months";

const Graph = () => {
  const { countryData, graphLoading } = useGlobalContext();
  console.log(graphLoading);
  const data = [];
  const [total, setTotal] = useState(true);
  const [deaths, setDeaths] = useState(true);
  const [recovered, setRecovered] = useState(true);
  const [active, setActive] = useState(true);

  for (let i = 0; i < countryData.length; i += 30) {
    let curr = countryData[i];
    let date = curr.day;
    let year = date.slice(0, 4);
    let month = parseInt(date.slice(5, 7));
    let newObj = {
      date: months[month] + " " + year,
      Total: curr.cases.total || 0,
      Deaths: curr.deaths.total || 0,
      Recovered: curr.cases.recovered || 0,
      Active:
        curr.cases.active ||
        curr.cases.total - curr.cases.recovered - curr.deaths.total,
    };
    data.push(newObj);
  }
  const handleClick = (e) => {
    let text = e.target.innerText;
    if (text === "Show All") {
      setTotal(true);
      setDeaths(true);
      setRecovered(true);
      setActive(true);
    }
    if (text === "Total Cases") {
      setTotal(true);
      setDeaths(false);
      setRecovered(false);
      setActive(false);
    }
    if (text === "Active Cases") {
      setTotal(false);
      setDeaths(false);
      setRecovered(false);
      setActive(true);
    }
    if (text === "Deaths") {
      setTotal(false);
      setDeaths(true);
      setRecovered(false);
      setActive(false);
    }
    if (text === "Recovered") {
      setTotal(false);
      setDeaths(false);
      setRecovered(true);
      setActive(false);
    }
  };

  return (
    <div
      className={
        graphLoading ? "graph-load graph-container" : "graph-container"
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={1000}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" stroke="#131313" />
          <YAxis stroke="#131313" />
          <Legend wrapperStyle={{ paddingTop: "15px" }} />
          <Tooltip />
          {total && <Line type="monotone" dataKey="Total" stroke="#131313" />}
          {deaths && <Line type="monotone" dataKey="Deaths" stroke="#F39237" />}
          {recovered && (
            <Line type="monotone" dataKey="Recovered" stroke="#BF1363" />
          )}
          {active && <Line type="monotone" dataKey="Active" stroke="#0E79B2" />}
        </LineChart>
      </ResponsiveContainer>
      <div className="buttons">
        <button onClick={handleClick}>Show All</button>
        <button onClick={handleClick}>Total Cases</button>
        <button onClick={handleClick}>Active Cases</button>
        <button onClick={handleClick}>Deaths</button>
        <button onClick={handleClick}>Recovered</button>
      </div>
    </div>
  );
};

export default Graph;
