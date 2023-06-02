import React, { useEffect, useState } from "react";
import axios from "axios";
import { getHmacUrl } from "./services/spark";
import "./App.css";
function App() {
  const [url, setUrl] = useState("");
  useEffect(() => {
    getSparkData(-7.210364581000806,-39.309899574052)
  }, []);
  function getSparkData(lat,long) {
    const url = getHmacUrl(lat, long);
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        // Processar os dados retornados pela API
        let dado = response.data.result;
        delete dado.pulseListGlobal;
        dado.closestDistanceKm = dado.closestPulseDistance * 1.6;
        console.log(dado);
        setUrl(dado.closestDistanceKm.toFixed(0)+" Km  /  "+dado.closestPulseDistance.toFixed(0)+"  miles")
      })
      .catch((error) => {
        // Lidar com erros de solicitação
        console.error("Erro na solicitação:", error);
      });
  }
  return (
    <div className="App">
      <h1>{url}</h1>
    </div>
  );
}

export default App;
