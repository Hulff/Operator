import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./form";
import { FaUndo } from "react-icons/fa";
import { writeOprData } from "../services/firebase";
import TablePreview from "./tablePreview";
import ButtonGoBack from "./buttonGoBack";
import Button from "./button";
import "./styles/tableSave.css";
const SaveOprData = ({ code }) => {
  useEffect(() => {
    divOprForm.current = document.getElementById("divOprForm");
    divOprTable.current = document.getElementById("divOprTable");
    btnOprCancel.current = document.getElementById("btnOprCancel");
    setStartHeight(divOprTable.current.children[0].offsetHeight);
  }, []);
  const [startHeight, setStartHeight] = useState(0);

  const navigate = useNavigate();
  const [oprData, setOprData] = useState({});
  const [btnText, setText] = useState("confirmar");
  const travelTime = useRef(null);
  const stopTime = useRef(null);
  const oprTypePassengerTravel = useRef(null);
  const oprTypePassengerStop = useRef(null);
  const divOprForm = useRef(null);
  const divOprTable = useRef(null);
  const btnOprCancel = useRef(null);
  function registerData(e) {
    const newData = {
      SistemaViagem: travelTime.current.value + " Horas",
      SistemaParado: stopTime.current.value + " Horas",
      OprPassaegeiroViagem: oprTypePassengerTravel.current.value + " Horas",
      OprPassaegeiroParado: oprTypePassengerStop.current.value + " Horas",
    };
    console.log(newData);
    console.log(new Date().toLocaleString("pt-BR"));
    divOprForm.current.style.animation = "hideDiv 1s linear forwards";
    divOprTable.current.style.animation = "showDiv 1s linear forwards";
    btnOprCancel.current.style.opacity = "1";
    setText("Confirmar");
    setOprData(newData);
    if (btnText == "Confirmar") {
      console.log("ok Salvo");
      writeOprData(code, new Date().toLocaleString("pt-BR"), newData);
      navigate("/Options");
    }
  }
  function cancel() {
    divOprTable.current.style.animation = "hideDiv 1s linear forwards";
    divOprForm.current.style.animation = "showDiv 1s linear forwards";
    btnOprCancel.current.style.opacity = "0";
    setText("Salvar");
  }
  return (
    <>
      <div className="container-export">
        <ButtonGoBack />
        <h1>Dados Operacionais</h1>
        <div
          id="divOprForm"
          style={{ "--start-height": `55vh`, "--start-pad": `3vh 0 2vh 0` }}
        >
          <Form
            type={"number"}
            names={[
              "Sistema [Viagem]",
              "Sistema [Parada]",
              "Tipo de operação - Passageiros [Viagem]",
              "Tipo de operação - Passageiros [Parada]",
            ]}
            setRefs={[
              travelTime,
              stopTime,
              oprTypePassengerTravel,
              oprTypePassengerStop,
            ]}
          />
        </div>
        <div id="divControl">
          <Button id={"btnOprCancel"} func={cancel} hidden={"hidden"}>
            <FaUndo /> Cancelar
          </Button>
          <Button func={registerData}>{btnText}</Button>
        </div>
        <div
          id="divOprTable"
          style={{
            "--start-height": `${startHeight}px`,
            "--start-pad": `0 0 3.3vh 0`,
          }}
        >
          <TablePreview
            data={oprData}
            headerName={[
              "Sistema [Viagem]",
              "Sistema [Parada]",
              "Tipo de operação - Passageiros [Viagem]",
              "Tipo de operação Passageiros [Parada]",
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default SaveOprData;
