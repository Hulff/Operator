import React, { useEffect, useRef, useState } from "react";
import "./styles/exportData.css";
import ButtonGoBack from "./buttonGoBack";
import {
  getTableAvailableDays,
  getTableAvailableMonths,
  getTableData,
} from "../services/firebase";
import ExportOptions from "./exportOptions";
const ExportTableData = ({ code }) => {
  useEffect(() => {
    console.log(code);
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
    const getAvailableMonthData = async (code, year, month) => {
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
    getAvailableDayData(code, 2023, 6);
    getAvailableMonthData(code, 2023);
    // getData(code, 2023, 6, 15, 17);
  }, []);
  const [data, setData] = useState({});
  const [availDayData, setAvailableDayData] = useState([]);
  const [availMonthData, setMonthData] = useState([]);
  const start = useRef(null);
  const end = useRef(null);
  return (
    <>
      <div className="container-export">
        <ButtonGoBack />
        <h1>Exportar Tabela</h1>
        <ExportOptions
          monthList={availMonthData}
          daysList={availDayData}
          refList={[start, end]}
        />
      </div>
    </>
  );
};

export default ExportTableData;
