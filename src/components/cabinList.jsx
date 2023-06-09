import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsSnow } from "react-icons/bs";
import { TbWindow, TbWindowOff } from "react-icons/tb";
import { MdOutlineRestartAlt } from "react-icons/md";
import { CgRemove, CgLogOff, CgInfo } from "react-icons/cg";
import { FaWifi } from "react-icons/fa";
import Button from "./button";
import CabinsManage from "./cabinsManage";
import "./styles/cabinList.css";
import { writeFullCabinsData, getCabinListData } from "../services/firebase";

const CabinList = ({ code, cabinsList, cabinsData, setCabinsData }) => {
  const divCabin = useRef(null);
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
  function sincronize() {
    let sincronizeBtn = document.getElementById("sincronizeBtn");
    divCabin.current = document.getElementById("cabinListDiv");
    sincronizeBtn.children[0].style.animation = "spin 1s infinite linear";
    divCabin.current.style.pointerEvents = "none";
    divCabin.current.style.filter = "brightness(0.5)";

    const getCabinsData = async () => {
      try {
        const data = await getCabinListData(code);
        console.log(data);
        setCabinsData(data);
      } catch (error) {
        console.error(error);
      } finally {
        //retirar o login
        sincronizeBtn.children[0].style.animation = "";
        divCabin.current.style.pointerEvents = "";
        divCabin.current.style.filter = "brightness(1)";
      }
    };
    getCabinsData();
  }
  return (
    <>
      <div className="container-list">
        <h1>Lista de cabines</h1>
        <div>
          <ul>
            <li>
              <h2>Atalhos rápidos</h2>
            </li>
            <li>
              <Button dataInfo={true} func={activeAll} name={"ac"}>
                <CgRemove />
              </Button>
              <Button dataInfo={false} func={activeAll} name={"ac"}>
                <CgLogOff />
              </Button>
              <Button>
                <BsSnow />
              </Button>
            </li>
            <li>
              <Button dataInfo={true} func={activeAll} name={"window"}>
                <CgRemove />
              </Button>
              <Button dataInfo={false} func={activeAll} name={"window"}>
                <CgLogOff />
              </Button>
              <Button>
                <TbWindow />
              </Button>
            </li>
            <li>
              <Button dataInfo={true} func={activeAll} name={"wifi"}>
                <CgRemove />
              </Button>
              <Button dataInfo={false} func={activeAll} name={"wifi"}>
                <CgLogOff />
              </Button>
              <Button>
                <FaWifi />
              </Button>
            </li>
          </ul>
          <Button id="sincronizeBtn" func={sincronize}>
            <MdOutlineRestartAlt></MdOutlineRestartAlt>
          </Button>
        </div>
        <div id="cabinListDiv">
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
