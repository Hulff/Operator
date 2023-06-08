import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getHmacUrl } from "../services/spark";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";
import ButtonControl from "./buttonSparkControl";
import "./styles/spark.css";
import img from "../imgs/lightning-svgrepo-com.svg";

function SparkData({coordinates, sparkData, setSparkData }) {
  const [playBtn, setBtnAction] = useState("Play");
  const [textMiles, setText1] = useState("");
  const [textKm, setText2] = useState("");
  const [coordinateX, setCoorX] = useState(0);
  const [coordinateY, setCoorY] = useState(0);
  const isFetchingRef = useRef(false); // Usando useRef para criar uma referência mutável
  const intervalId = useRef(""); // Usando useRef para criar uma referência mutável
  const btnAction = useRef(getSparkDataLoop);

  useEffect(() => {
    console.log(coordinates)
    let load = document.getElementById("loadingDiv");
    let thunderDiv = document.getElementById("thunderDiv");
    let thunderImg = document.getElementById("thunderImg");
    intervalId.current = null; // Limpar o ID do intervalo
    setCoorX(coordinates.latitude);
    setCoorY(coordinates.longitude);
    if (sparkData !== null && sparkData !== undefined) {
      console.log("tem dado");
      setText1(`${sparkData.closestPulseDistance} miles`);
      setText2(`${sparkData.closestDistanceKm} km`);
      load.style.opacity = 0;
      load.style.height = 0;
      thunderDiv.style.opacity = 1;
      thunderImg.style.background = sparkData.alertColor;
    } else {
      getSparkData(coordinates.latitude,coordinates.longitude);
    }

    return () => {
      console.log("desmontado");
      clearInterval(intervalId.current); // Parar o intervalo se o ID do intervalo existir
    };
  }, []);

  function getSparkData(lat, long) {
    let load = document.getElementById("loadingDiv");
    let thunderDiv = document.getElementById("thunderDiv");
    let thunderImg = document.getElementById("thunderImg");
    if (isFetchingRef.current) {
      return; // Retorna se o fetch estiver em andamento
    }

    load.style.opacity = 1;
    load.style.height = "4em";
    thunderDiv.style.opacity = 0;

    const url = getHmacUrl(lat, long);
    console.log(url);
    isFetchingRef.current = true; // Define a flag para true para indicar que o fetch está em andamento

    axios
      .get(url)
      .then((response) => {
        // Processar os dados retornados pela API
        let dado = response.data.result;
        delete dado.pulseListGlobal;
        dado.closestPulseDistance = dado.closestPulseDistance.toFixed(0);
        dado.closestDistanceKm = (dado.closestPulseDistance * 1.60934).toFixed(0);
        console.log(dado);
        setSparkData(dado);
        setText1(`${dado.closestPulseDistance} miles`);
        setText2(`${dado.closestDistanceKm} km`);

        load.style.opacity = 0;
        load.style.height = 0;
        thunderDiv.style.opacity = 1;
        thunderImg.style.background = dado.alertColor;
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
    setBtnAction("Stop");
    btnAction.current = stopInterval;
    intervalId.current = setInterval(() => {
      if (!isFetchingRef.current) {
        getSparkData(lat, long);
      }
    }, 4000);
  }
  function stopInterval() {
    setBtnAction("Play");
    btnAction.current = getSparkDataLoop;

    if (intervalId.current) {
      clearInterval(intervalId.current); // Parar o intervalo se o ID do intervalo existir
      intervalId.current = null; // Limpar o ID do intervalo
    }
  }
  return (
    <div className="container-spark">
      <Loading></Loading>
      <div id="thunderDiv" className="container-spark-thunder-div">
        <img
          alt="thunder image"
          id="thunderImg"
          className="container-spark-thunder-img"
          src={img}
        />
        <div>
          <h1 id="h1Data">{textMiles}</h1>
          <h1 id="h2Data">{textKm}</h1>
        </div>
      </div>
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
          func={btnAction.current}
        >
          {playBtn}
        </ButtonControl>
      </div>
    </div>
  );
}

export default SparkData;
