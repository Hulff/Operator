import React, { Component, useRef } from "react";
import Form from "./form";
import ButtonGoBack from "./buttonGoBack";
import Button from "./button";
import "./styles/tableSave.css";
const SaveOprData = () => {
  const travelTime = useRef(null);
  const stopTime = useRef(null);
  const oprTypePassengerTravel = useRef(null);
  const oprTypePassengerStop = useRef(null);
  const oprTypeServiceTravel = useRef(null);
  const oprTypeServiceStop = useRef(null);
  return (
    <>
      <div className="container-export">
        <ButtonGoBack />
        <h1>Tabela</h1>
        <div>
          <Form
            type={"number"}
            names={[
              "Sistema [Viagem]",
              "Sistema [Parada]",
              "Tipo de operação - Passageiros  [Viagem]",
              "Tipo de operação - Passageiros [Parada]",
              "Tipo de operação de serviço [Viagem]",
              "Tipo de operação de serviço [Parada]",
            ]}
            setRefs={[
              travelTime,
              stopTime,
              oprTypePassengerTravel,
              oprTypePassengerStop,
              oprTypeServiceTravel,
              oprTypeServiceStop,
            ]}
          />
        </div>
        <Button>Salvar</Button>
      </div>
    </>
  );
};

export default SaveOprData;
