import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgChevronRight, CgFormatJustify } from "react-icons/cg";
import { MdOutlineWindow } from "react-icons/md";
import Button from "./button";
import img from "../imgs/lightning-svgrepo-com.svg";
import CabinAddButton from "./cabinAddButton";
import Selected from "./selected";
import "./styles/cabinOrder.css";

const CabinOrder = ({ data, setCabinsList, cabinsList }) => {
  return (
    <>
      <div className="container-order">
        <h1>Ordem das cabines</h1>
        <ul>
          <Selected cabinsList={cabinsList} />
        </ul>
        <h2>Clique para selecionar</h2>
        <ul>
          <CabinAddButton
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
