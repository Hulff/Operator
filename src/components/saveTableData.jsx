import React, { Component, useEffect, useRef, useState } from "react";
import Form from "./form";
import ButtonGoBack from "./buttonGoBack";
import Button from "./button";
import "./styles/tableSave.css";
import { writeTableData } from "../services/firebase";
import { FaUndo } from "react-icons/fa";
import TablePreview from "./tablePreview";
const SaveTableData = ({ code }) => {
  useEffect(() => {
    divForm.current = document.getElementById("divForm");
    divTable.current = document.getElementById("divTable");
    console.log(code);
  }, []);
  const [tableData, setTableData] = useState({});
  const [btnText, setText] = useState("Salvar");
  const divForm = useRef(null);
  const divTable = useRef(null);
  const time = useRef(null);
  const cabinNumber = useRef(null);
  const speed = useRef(null);
  const windSpeed = useRef(null);
  const t1 = useRef(null);
  const t2 = useRef(null);
  const p1 = useRef(null);
  const p2 = useRef(null);
  const pressService = useRef(null);
  const pressEmergency = useRef(null);
  const carPosition = useRef(null);
  const outsideTemp = useRef(null);
  function registerData(e) {
    console.log(e.target);
    const newData = {
      horario: time.current.value,
      nDeCabines: cabinNumber.current.value,
      velocidade: speed.current.value + " m/s",
      ventoNaTorre10: windSpeed.current.value + " m/s",
      CarroTensor1: t1.current.value + " KN",
      CarroTensor2: t2.current.value + " KN",
      CarroTensor1Pressao: p1.current.value + " Bar",
      CarroTensor2Pressao: p2.current.value + " Bar",
      pressaoServiço: pressService.current.value + " Bar",
      pressaoEmergencia: pressEmergency.current.value + "Bar",
      posiçãoDoCarro: carPosition.current.value + " cm",
      temperaturaAmbiente: outsideTemp.current.value + " °C",
    };
    console.log(newData);
    console.log(new Date().toLocaleString("pt-BR"));
    console.log(divForm.current);
    console.log(divTable.current);
    divForm.current.style.animation = "hideDiv 1s linear forwards";
    divTable.current.style.animation = "showDiv 1s linear forwards";
    setText("Confirmar");
    setTableData(newData);
    if (btnText == "Confirmar") {
      console.log("ok Salvo");
      writeTableData(code, new Date().toLocaleString("pt-BR"), newData);
    }
  }
  function cancel() {
    divTable.current.style.animation = "hideDiv 1s linear forwards";
    divForm.current.style.animation = "showDiv 1s linear forwards";
    setText("Salvar");

  }
  return (
    <>
      <div className="container-export">
        <ButtonGoBack />
        <h1>Tabela</h1>
        <div id="divForm" style={{ "--start-height": `55vh` }}>
          <Form
            time={[true, time]}
            type={"number"}
            names={[
              "N° de Cabines em Linha",
              "Velocidade [ms]",
              "Vento na torre 10 [m/s]",
              "Carro tensor 1 - Tensão em [KN]",
              "Carro tensor 2 - Tensão em [KN]",
              "Carro tensor 1 - Pressão em [Bar]",
              "Carro tensor 2 - Pressão em [Bar]",
              "Pressão do freio de serviço [Bar]",
              "Pressão do freio de emergência [Bar]",
              "Posição do carro tensor [cm]",
              "Temperatura ambiente [°C]",
            ]}
            setRefs={[
              cabinNumber,
              speed,
              windSpeed,
              t1,
              t2,
              p1,
              p2,
              pressService,
              pressEmergency,
              carPosition,
              outsideTemp,
            ]}
          />
        </div>
        <div id="divControl">
          <Button func={cancel} hidden={true}>
            <FaUndo /> Cancelar
          </Button>
          <Button func={registerData}>{btnText}</Button>
        </div>
        <div id="divTable" style={{ "--start-height": `18vh` }}>
          <TablePreview
            data={tableData}
            headerName={[
              "Horário",
              "Número de Cabines",
              "Velocidade [m/s]",
              "Vento na Torre #10 [m/s]",
              "Carro tensor 1 - Tensão [KN]",
              "Carro tensor 2 - Tensão [KN]",
              "Carro tensor 1 - Pressão [Bar]",
              "Carro tensor 2 - Pressão [Bar]",
              "Pressão do freio de serviço [Bar]",
              "Pressão do freio de emergência [Bar]",
              "Posição do carro tensor [cm]",
              "Temperatura ambiente [°C]",
            ]}
          ></TablePreview>
        </div>
      </div>
    </>
  );
};

export default SaveTableData;
