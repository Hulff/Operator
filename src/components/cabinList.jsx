import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { CgChevronRight, CgFormatJustify } from "react-icons/cg";
import { MdOutlineWindow } from "react-icons/md";
import Button from "./button";
import CabinsManage from "./cabinsManage";
import "./styles/cabinList.css";

const CabinList = ({code,cabinsList}) => {
  return (
    <>
      <div className="container-list">
        <h1>Lista de cabines:</h1>
        <div>
          <CabinsManage code={code} cabinsList={cabinsList}/>
        </div>
      </div>
    </>
  );
};

export default CabinList;