import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SparkData from "./components/sparkData";
import Login from "./components/login";
import CabinOrder from "./components/cabinOrder"
import CabinList from "./components/cabinList"
import "./App.css";
import Options from "./components/options";

function App() {
  const [code, setCode] = useState(null);
  const [data, setData] = useState({});
  const [sparkData, setSparkData] = useState(null);
  const [cabinsData, setCabinsData] = useState(null);
  const [cabinsList,setCabinsList] = useState([])

  return (
    <>
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Login setCode={setCode} code={code} setData={setData}></Login>
              </>
            }
          />
          <Route
            exact
            path="/Spark"
            element={
              <>
                <SparkData
                  sparkData={sparkData}
                  setSparkData={setSparkData}
                ></SparkData>
              </>
            }
          />
          <Route
            exact
            path="/Options"
            element={
              <>
                <Options data={data}></Options>
              </>
            }
          />
          <Route
            exact
            path="/OrdemDeCabines"
            element={
              <>
                <CabinOrder cabinsList={cabinsList} data={data} setCabinsList={setCabinsList}/>
              </>
            }
          />
          <Route
            exact
            path="/ListaDeCabines"
            element={
              <>
                <CabinList code={code} data={data} cabinsList={cabinsList} setData={setData} />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
