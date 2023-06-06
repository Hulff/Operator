import React, { useEffect, useState } from "react";
import Button from "./button";
import { MdOutlineWindow } from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { TbWindow, TbWindowOff } from "react-icons/tb";
import { writeCabinsData } from "../services/firebase";
import "./styles/cabinOrder.css";

const CabinsManage = ({ code,cabinsList,cabins }) => {
  function active(e) {
    console.log(code)
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.children[0].classList.value);
    if (e.target.classList.value == "" || null || undefined) {
        writeCabinsData(code,e.target.name,e.target.children[0].classList.value,true)
      e.target.classList.add("active");
    } else {
      e.target.classList.remove("active");
      writeCabinsData(code,e.target.name,e.target.children[0].classList.value,false)
      
    }
  }
  return (
    <>
      {cabinsList.map((cabin) => (
        <div>
          <div>
            <MdOutlineWindow />
          </div>
          <div>
            <h3>{`Cabine ${cabin}`}</h3>
            <Button name={cabin} func={active}>
              <BsSnow class="snow"/>
            </Button>
            <Button  name={cabin}  func={active}>
              <TbWindow class="window" />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CabinsManage;
