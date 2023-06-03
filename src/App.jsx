import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getHmacUrl } from "./services/spark";
import Loading from "./components/loading";
import Button from "./components/button";
import ButtonControl from "./components/buttonSparkControl";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [playBtn, setBtnAction] = useState("Play");
  const [coordinateX, setCoorX] = useState(0);
  const [coordinateY, setCoorY] = useState(0);
  const isFetchingRef = useRef(false); // Usando useRef para criar uma referência mutável

  useEffect(() => {
    setCoorX(-7.210364581000806);
    setCoorY(-39.309899574052);
    getSparkData(-7.210364581000806, -39.309899574052);
  }, []);

  function getSparkData(lat, long) {
    let load = document.getElementById("loadingDiv");
    let h1 = document.getElementById("h1Data");

    if (isFetchingRef.current) {
      return; // Retorna se o fetch estiver em andamento
    }

    load.style.opacity = 1;
    load.style.height = "4em";
    h1.style.opacity = 0;

    const url = getHmacUrl(lat, long);
    console.log(url);
    isFetchingRef.current = true; // Define a flag para true para indicar que o fetch está em andamento

    axios
      .get(url)
      .then((response) => {
        // Processar os dados retornados pela API
        let dado = response.data.result;
        delete dado.pulseListGlobal;
        dado.closestDistanceKm = dado.closestPulseDistance * 1.6;
        console.log(dado);
        setUrl(
          dado.closestDistanceKm.toFixed(0) +
            " Km  /  " +
            dado.closestPulseDistance.toFixed(0) +
            "  miles"
        );
        load.style.opacity = 0;
        load.style.height = 0;
        h1.style.opacity = 1;
        isFetchingRef.current = false; // Define a flag para false para indicar que o fetch foi concluído
      })
      .catch((error) => {
        // Lidar com erros de solicitação
        console.error("Erro na solicitação:", error);
        isFetchingRef.current = false; // Define a flag para false em caso de erro também
      });
  }

  function getSparkDataLoop(lat, long) {
    getSparkData(lat, long);
    setBtnAction("Stop")
    setInterval(() => {
      if (!isFetchingRef.current) {
        getSparkData(lat, long);
      }
    }, 5000);
  }
  return (
    <div className="App">
      <Loading></Loading>
      <h1 id="h1Data">{url}</h1>
      <div className="container-spark-control">
        <ButtonControl
          classes={"spark-api-button"}
          p1={coordinateX}
          p2={coordinateY}
          func={getSparkData}
        >
          Search Again
        </ButtonControl>
        <ButtonControl
          classes={"spark-api-button"}
          p1={coordinateX}
          p2={coordinateY}
          func={getSparkDataLoop}
        >
         {playBtn}
        </ButtonControl>
      </div>
    </div>
  );
}

export default App;
