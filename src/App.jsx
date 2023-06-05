import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SparkData from "./components/sparkData";
import Login from "./components/login"
import "./App.css";

function App() {
  const [code,setCode] = useState(null)
  const [sparkData,setSparkData] = useState(null)
  const [orderData,setOrderData] = useState(null)
  const [cabinsData,setCabinsData] = useState(null)
  return (
    <>
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Login setCode={setCode} code={code}></Login>
              </>
            }
          />
          <Route
            exact
            path="/Spark"
            element={
              <>
                <SparkData sparkData={sparkData} setSparkData={setSparkData}></SparkData>
              </>
            }
          />
          <Route
            exact
            path="/Options"
            element={
              <>

              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
