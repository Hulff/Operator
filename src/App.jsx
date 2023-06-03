import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SparkData from "./components/sparkData";
import Login from "./components/login"
import "./App.css";

function App() {

  return (
    <>
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Login></Login>
              </>
            }
          />
          <Route
            exact
            path="/Spark"
            element={
              <>
                <SparkData></SparkData>
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
