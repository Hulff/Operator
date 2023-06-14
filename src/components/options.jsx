import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgChevronRight, CgFormatJustify, CgAddR } from "react-icons/cg";
import { TbFileExport, TbTableImport } from "react-icons/tb";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdOutlineWindow, MdPlaylistAdd } from "react-icons/md";
import Button from "./button";
import "./styles/options.css";
import ButtonGoBack from "./buttonGoBack";

const Options = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, []);
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
  function goToExportData() {
    navigate(`/DadosOperacionais`);
  }
  function goToRegisterData() {
    navigate(`/RegistrarDadosOperacionais`);
  }
  return (
    <>
      <div className="container-options">
        <ButtonGoBack />
        <ul>
          <li>
            <div className="img-thunder">
              <AiFillThunderbolt />
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
          <li>
            <div className="img-export-data">
              <TbTableImport />
            </div>
            <h2>Registrar Dados</h2>
            <Button func={goToRegisterData}>
              <CgChevronRight />
            </Button>
          </li>
          <li>
            <div className="img-export-data">
              <TbFileExport />
            </div>
            <h2>Exportar Dados</h2>
            <Button func={goToExportData}>
              <CgChevronRight />
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Options;
