import React from "react";
import Chart from "../components/Chart";

const ChartWrapper = ({ results }) => {
  return (
    <>
      <Chart results={results} />
    </>
  );
};

export default ChartWrapper;
