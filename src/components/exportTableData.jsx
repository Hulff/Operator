import React, { useEffect, useRef, useState } from "react";
import { FaUndo } from "react-icons/fa";
import "./styles/exportData.css";
import ButtonGoBack from "./buttonGoBack";
import Button from "./button";
import {
  getTableAvailableDays,
  getTableAvailableMonths,
  getTableData,
} from "../services/firebase";
import ExportOptions from "./exportOptions";
import TableShow from "./tableShow";
const ExportTableData = ({ code }) => {
  useEffect(() => {
    divForm.current = document.getElementById("divExport");
    divTable.current = document.getElementById("divTableExport");
    btnCancel.current = document.getElementById("btnCancel");
    console.log(code);
  }, []);
  const [btnText, setText] = useState("Salvar");
  const divForm = useRef(null);
  const divTable = useRef(null);
  const btnCancel = useRef(null);
  const [data, setData] = useState({});
  const [availDayData, setAvailableDayData] = useState([]);
  const [availMonthData, setMonthData] = useState([]);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const start = useRef(null);
  const end = useRef(null);
  function handleYearInputChange(e) {
    console.log(e.target.value);
    const getAvailableMonthData = async (code, year) => {
      try {
        const data = await getTableAvailableMonths(code, year);
        console.log(data);
        if (data != null) {
          setMonthData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log("fim do get");
      }
    };
    setYear(parseFloat(e.target.value));
    getAvailableMonthData(code, parseFloat(e.target.value));
  }
  function handleMonthInputChange(e) {
    const getAvailableDayData = async (code, year, month) => {
      try {
        const data = await getTableAvailableDays(code, year, month);
        console.log(data);
        if (data != null) {
          setAvailableDayData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log("fim do get");
      }
    };
    setMonth(parseFloat(e.target.value));
    getAvailableDayData(code, year, parseFloat(e.target.value));
  }
  function importData() {
    const getData = async (code, year, month, start, end) => {
      try {
        const data = await getTableData(code, year, month, start, end);
        console.log(data);
        if (data != null) {
          setData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log("fim do get");
      }
    };
    if (
      start.current.value !== null &&
      end.current.value !== null &&
      start.current.value < end.current.value
    ) {
      divForm.current.style.animation = "hideDiv 1s linear forwards";
      divTable.current.style.animation = "showDiv 1s linear forwards";
      btnCancel.current.style.opacity = "1";
      setText("Confirmar");
      getData(code, year, month, start.current.value, end.current.value);
    }
  }
  function cancel() {
    divTable.current.style.animation = "hideDiv 1s linear forwards";
    divForm.current.style.animation = "showDiv 1s linear forwards";
    btnCancel.current.style.opacity = "0";
    setText("Salvar");
  }
  return (
    <>
      <div className="container-export">
        <ButtonGoBack />
        <h1>Exportar Tabela</h1>
        <ExportOptions
          id={"divExport"}
          handleYearInputChange={handleYearInputChange}
          handleMonthInputChange={handleMonthInputChange}
          monthList={availMonthData}
          daysList={availDayData}
          refList={[start, end]}
        />
        <div id="divControl">
          <Button id={"btnCancel"} func={cancel} hidden={"hidden"}>
            <FaUndo /> Cancelar
          </Button>
          <Button func={importData}>{btnText}</Button>
        </div>
        <div
          id="divTableExport"
          style={{
            "--start-height": `45vh`,
            "--start-pad": `0 0 .5vh 0`,
          }}
        >
          <TableShow
            headerName={[
              "Data",
              "Horário",
              "Número de Cabines",
              "Velocidade [m/s]",
              "Vento na Torre #10 [m/s]",
              "Carro tensor 1 - Tensão [KN]",
              "Carro tensor 2 - Tensão [KN]",
              "Carro tensor 1 - Pressão [Bar]",
              "Carro tensor 2 - Pressão [Bar]",
              "Pressão do freio de serviço [Bar]",
              "Pressão do freio de emergência [Bar]",
              "Posição do carro tensor [cm]",
              "Temperatura ambiente [°C]",
            ]}
            data={data}
            year={year}
            month={month}
          />
        </div>
      </div>
    </>
  );
};

export default ExportTableData;
