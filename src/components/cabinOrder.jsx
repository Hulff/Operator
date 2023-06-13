import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import Button from "./button";
import img from "../imgs/lightning-svgrepo-com.svg";
import CabinAddButton from "./cabinAddButton";
import Selected from "./selected";
import { writeCabinsOrder } from "../services/firebase";
import "./styles/cabinOrder.css";

const CabinOrder = ({ code, data, setCabinsList, cabinsList }) => {
  function clear() {
    setCabinsList([]);
    writeCabinsOrder(code, []);
  }
  return (
    <>
      <div className="container-order">
        <h1>Ordem das cabines</h1>
        <ul>
          <Selected
            code={code}
            setCabinsList={setCabinsList}
            cabinsList={cabinsList}
          />
        </ul>
        <div>
          <Button func={clear}>
            <RxCross2 />
            Limpar
          </Button>
        </div>
        <h2>Clique para selecionar</h2>
        <ul>
          <CabinAddButton
            code={code}
            cabinsList={cabinsList}
            setCabinsList={setCabinsList}
            data={data}
          />
        </ul>
      </div>
    </>
  );
};

export default CabinOrder;
