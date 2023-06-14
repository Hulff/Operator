import React, { Component } from "react";
import Form from "./form";
import ButtonGoBack from "./buttonGoBack";
import Button from "./button";
import "./styles/tableSave.css";
const SaveTableData = () => {
  return (
    <>
      <div className="container-export">
        <ButtonGoBack />
        <h1>Tabela</h1>
        <div>
          <Form
            time={true}
            type={"number"}
            names={[
              "N° de Cabines em Linha",
              "Velocidade [ms]",
              "Vento na torre 10 [m/s]",
              "Carro tensor 1 - Tensão [KN]",
              "Carro tensor 2 - Tensão em [KN]",
              "Pressão do freio de serviço [Bar]",
              "Pressão do freio de emergência [Bar]",
              "Posição do carro tensor [cm]",
              "Temperatura ambiente [°C]",
            ]}
          />
        </div>
        <Button>Salvar</Button>
      </div>
    </>
  );
};

export default SaveTableData;
