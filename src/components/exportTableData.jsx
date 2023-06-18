import React, { useEffect, useRef, useState } from "react";
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
    console.log(code);
  }, []);
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
    console.log(year);
    console.log(month);
    console.log(start.current.value);
    console.log(end.current.value);
    if (
      start.current.value !== null &&
      end.current.value !== null &&
      start.current.value < end.current.value
    ) {
      getData(code, year, month, start.current.value, end.current.value);
    }
  }
  return (
    <>
      <div className="container-export">
        <ButtonGoBack />
        <h1>Exportar Tabela</h1>
        <ExportOptions
          handleYearInputChange={handleYearInputChange}
          handleMonthInputChange={handleMonthInputChange}
          monthList={availMonthData}
          daysList={availDayData}
          refList={[start, end]}
        />
        <Button id="btnImport" func={importData}>
          Buscar
        </Button>
      </div>
      <div id="divTable">
        <TableShow
          headerName={[
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
        />
      </div>
    </>
  );
};

export default ExportTableData;
