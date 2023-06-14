import React, { Component } from "react";
import Form from "./form";
import ButtonGoBack from "./buttonGoBack";
import Button from "./button";
import "./styles/tableSave.css";
const SaveOprData = () => {
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
              "Pressão do freio de emergência [Bar]",
              "Acionamento [Motor 1 em operação]"
            ]}
          />
        </div>
          <Button>Salvar</Button>
      </div>
    </>
  );
};

export default SaveOprData;
