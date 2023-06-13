import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getCodeData, getCabinListData } from "./services/firebase";
import { useCookies } from "react-cookie";
import "./App.css";
import SparkData from "./components/sparkData";
import Login from "./components/login";
import CabinOrder from "./components/cabinOrder";
import CabinList from "./components/cabinList";
import Options from "./components/options";
import Loading from "./components/loading";
import ExportData from "./components/exportData";

function App() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["code"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCabinData, setIsLoadingCabinData] = useState(true);
  const [code, setCode] = useState(null);
  const [data, setData] = useState({});
  const [sparkData, setSparkData] = useState(null);
  const [cabinsData, setCabinsData] = useState(null);
  const [cabinsList, setCabinsList] = useState([]);

  useEffect(() => {
    if (cookies.code) {
      setCookie("code", cookies.code, { maxAge: 60 * 60 * 24 * 7 });
      setCode(cookies.code);
      console.log(cookies.code);
      const getData = async () => {
        try {
          const data = await getCodeData(cookies.code);
          console.log(data);
          if (data != null) {
            setData(data);
          }
          if (data.cabinOrder) {
            setCabinsList(data.cabinOrder);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      const getCabinsData = async () => {
        try {
          const data = await getCabinListData(cookies.code);
          console.log(data);
          setCabinsData(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingCabinData(false);
        }
      };
      getData();
      getCabinsData();
    } else {
      console.log("sem dados salvos/ cookies expirados");
      navigate("/");
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
              isLoading ? (
                <Loading />
              ) : (
                <>
                  <SparkData
                    coordinates={data.coordinates}
                    sparkData={sparkData}
                    setSparkData={setSparkData}
                  ></SparkData>
                </>
              )
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
              isLoadingCabinData ? (
                <Loading />
              ) : (
                <>
                  <CabinList
                  setCabinsList={setCabinsList}
                    setCabinsData={setCabinsData}
                    code={code}
                    cabinsData={cabinsData}
                    cabinsList={cabinsList}
                  />
                </>
              )
            }
          />
          <Route
            exact
            path="/DadosOperacionais"
            element={
              <>
                <ExportData />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
