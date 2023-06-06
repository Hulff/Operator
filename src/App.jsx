import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import SparkData from "./components/sparkData";
import Login from "./components/login";
import CabinOrder from "./components/cabinOrder";
import CabinList from "./components/cabinList";
import { getCodeData } from "./services/firebase";
import "./App.css";
import Options from "./components/options";
import { useNavigate } from "react-router-dom";
import Loading from "./components/loading";

function App() {
  const [cookies, setCookie] = useCookies(["code"]);
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState(null);
  const [data, setData] = useState({});
  const [sparkData, setSparkData] = useState(null);
  const [cabinsData, setCabinsData] = useState(null);
  const [cabinsList, setCabinsList] = useState([]);

  useEffect(() => {
    if (cookies.code) {
      setCode(cookies.code);
      console.log(cookies.code);
      const getData = async () => {
        try {
          const data = await getCodeData(cookies.code);
          console.log(data);
          setData(data);
          if (data.cabinOrder) {
            setCabinsList(data.cabinOrder);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      getData();
    }
  }, []);

  return (
    <>
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Login
                  setIsLoading={setIsLoading}
                  setCabinsList={setCabinsList}
                  setCode={setCode}
                  code={code}
                  setData={setData}
                ></Login>
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
              isLoading ? (
                <Loading />
              ) : (
                <>
                  <CabinOrder
                    code={code}
                    cabinsList={cabinsList}
                    data={data}
                    setCabinsList={setCabinsList}
                  />
                </>
              )
            }
          />
          <Route
            exact
            path="/ListaDeCabines"
            element={
              isLoading ? (
                <Loading />
              ) : (
                <>
                  <CabinList
                    code={code}
                    data={data}
                    cabinsList={cabinsList}
                    setData={setData}
                  />
                </>
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
