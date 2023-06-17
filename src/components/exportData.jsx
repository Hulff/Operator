import React, { useEffect } from "react";
import "./styles/exportData.css";
import {
  TbDatabaseImport,
  TbTableExport,
} from "react-icons/tb";
import { CgChevronRight } from "react-icons/cg";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import ButtonGoBack from "./buttonGoBack";
import { getTableData } from "../services/firebase";
const ExportData = ({ code }) => {
  useEffect(() => {

  }, []);
  const navigate = useNavigate();
  function gotToDayData() {
    navigate("/ExportarTabela");
  }
  function goToOperationalData() {
    navigate("/ExportarDadosOperacionais");
  }
  return (
    <>
      <div className="container-export">
        <ButtonGoBack />
        <h1>Exportar Dados</h1>
        <ul>
          <li>
            <div className="img-thunder">
              <TbTableExport />
            </div>
            <h2>Tabela dia a dia</h2>
            <Button func={gotToDayData}>
              <CgChevronRight />
            </Button>
          </li>
          <li>
            <div className="img-cabin">
              <TbDatabaseImport />
            </div>
            <h2>Dados Operacionais</h2>
            <Button func={goToOperationalData}>
              <CgChevronRight />
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ExportData;
