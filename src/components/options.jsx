import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { CgChevronRight, CgFormatJustify } from "react-icons/cg";
import {AiFillThunderbolt} from "react-icons/ai"
import { MdOutlineWindow } from "react-icons/md";
import Button from "./button";
import "./styles/options.css"

const Options = ({data}) => {
  useEffect(()=>{
    console.log(data)
},[])
  const navigate = useNavigate();
  function goToSpark() {
    navigate(`/Spark`);
  }
  function goToCabinOrder() {
    navigate(`/OrdemDeCabines`);
  }
  function goToCabinList() {
    navigate(`/ListaDeCabines`);
  }
  return (
    <>
      <div className="container-options">
        <ul>
          <li>
          <div className="img-thunder">
              <AiFillThunderbolt/>
            </div>
            <h2>Distancia dos raios</h2>
            <Button func={goToSpark}>
              <CgChevronRight />
            </Button>
          </li>
          <li>
            <div className="img-cabin">
              <MdOutlineWindow />
            </div>
            <h2>Ordem das Cabines</h2>
            <Button func={goToCabinOrder}>
              <CgChevronRight />
            </Button>
          </li>
          <li>
            <div className="img-cabin-list">
              <CgFormatJustify />
            </div>
            <h2>Lista das Cabines</h2>
            <Button func={goToCabinList}>
              <CgChevronRight />
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Options;
