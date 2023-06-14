import React from "react";
import "./styles/exportData.css";
import { TbDatabaseExport, TbTableShortcut } from "react-icons/tb";
import { CgChevronRight } from "react-icons/cg";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import ButtonGoBack from "./buttonGoBack";
const RegisterData = () => {
  const navigate = useNavigate();
  function gotToDayData() {
    navigate("/SalvarTabela");
  }
  function goToOperationalData() {
    navigate("/SalvarDadosOperacionais");
  }
  return (
    <>
      <div className="container-export">
        <ButtonGoBack />
        <h1>Registrar Dados</h1>
        <ul>
          <li>
            <div className="img-thunder">
              <TbTableShortcut />
            </div>
            <h2>Tabela dia a dia</h2>
            <Button func={gotToDayData}>
              <CgChevronRight />
            </Button>
          </li>
          <li>
            <div className="img-cabin">
              <TbDatabaseExport />
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

export default RegisterData;
