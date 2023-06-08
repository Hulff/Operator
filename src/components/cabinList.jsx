import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSnow } from "react-icons/bs";
import { TbWindow, TbWindowOff } from "react-icons/tb";
import { FaWifi } from "react-icons/fa";
import Button from "./button";
import CabinsManage from "./cabinsManage";
import "./styles/cabinList.css";
import { writeFullCabinsData } from "../services/firebase";

const CabinList = ({ code, cabinsList, cabinsData, setCabinsData }) => {
  function activeAll(e) {
    console.log(code);
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.dataset.info);
    let stringValue = e.target.dataset.info;
    let value = stringValue === "true";
    if (cabinsData != null) {
      const newCabinsData = { ...cabinsData };
      Object.keys(newCabinsData).forEach((cabin) => {
        if (newCabinsData[cabin]) {
          if (newCabinsData[cabin][e.target.name]) {
            newCabinsData[cabin][e.target.name].value = value;
          } else {
            newCabinsData[cabin][e.target.name] = {
              value: value,
            };
          }
        } else {
          newCabinsData[cabin] = {
            [e.target.name]: { value: value },
          };
        }
      });
      console.log(newCabinsData);
      setCabinsData(newCabinsData);
      writeFullCabinsData(code, newCabinsData);
    } else {
      const newCabinsData = {};
      cabinsList.forEach((cabin) => {
        if (newCabinsData[cabin]) {
          if (newCabinsData[cabin][e.target.name]) {
            newCabinsData[cabin][e.target.name].value = value;
          } else {
            newCabinsData[cabin][e.target.name] = {
              value: value,
            };
          }
        } else {
          newCabinsData[cabin] = {
            [e.target.name]: { value: value },
          };
        }
      });
      setCabinsData(newCabinsData);
      writeFullCabinsData(code, newCabinsData);
    }
  }
  return (
    <>
      <div className="container-list">
        <h1>Lista de cabines:</h1>
        <h2>Atalhos rápidos:</h2>
        <ul>
          <li>
            <Button dataInfo={true} func={activeAll} name={"ac"}>
              <p>Marcar todos</p> <BsSnow />
            </Button>
          </li>
          <li>
            <Button dataInfo={false} func={activeAll} name={"ac"}>
              <p>Limpar todos</p> <BsSnow />
            </Button>
          </li>
          <li>
            <Button dataInfo={true} func={activeAll} name={"window"}>
              <p>Marcar todos</p> <TbWindow />
            </Button>
          </li>
          <li>
            <Button dataInfo={false} func={activeAll} name={"window"}>
              <p>Limpar todos</p> <TbWindow />
            </Button>
          </li>
          <li>
            <Button dataInfo={true} func={activeAll} name={"wifi"}>
              <p>Marcar todos</p> <FaWifi />
            </Button>
          </li>
          <li>
            <Button dataInfo={false} func={activeAll} name={"wifi"}>
              <p>Limpar todos</p> <FaWifi />
            </Button>
          </li>
        </ul>
        <div>
          <CabinsManage
            setCabinsData={setCabinsData}
            code={code}
            cabinsData={cabinsData}
            cabinsList={cabinsList}
          />
        </div>
      </div>
    </>
  );
};

export default CabinList;
