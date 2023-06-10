import React from "react";
import "./styles/exportData.css";
import Form from "./form";
const ExportData = () => {
  return (
    <>
      <div className="container-export">
        <h1>Registrar dados do dia</h1>
            <Form fields={4} names={["vento","pressão1","pressão2","posição do carro tensor"]}/>
        <h1>Registrar dados operacionais</h1>
      </div>
    </>
  );
};

export default ExportData;
