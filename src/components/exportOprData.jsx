import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { FaUndo } from "react-icons/fa";
import { TbFileDownload, TbDownload } from "react-icons/tb";
import "./styles/exportData.css";
import ButtonGoBack from "./buttonGoBack";
import Button from "./button";
import {
  getOprAvailableDays,
  getOprAvailableMonths,
  getOprData,
} from "../services/firebase";
import ExportOptions from "./exportOptions";
import TableShow from "./tableShow";
const ExportOprData = ({ code }) => {
  useEffect(() => {
    divForm.current = document.getElementById("divExport");
    divTable.current = document.getElementById("divTableExport");
    btnCancel.current = document.getElementById("btnCancel");
    btnDownload.current = document.getElementById("btnImport");
    select1.current = document.getElementById("select1");
    select2.current = document.getElementById("select2");
    select3.current = document.getElementById("select3");
    console.log(code);
  }, []);
  const [btnText, setText] = useState("Salvar");
  const [data, setData] = useState(null);
  const [availDayData, setAvailableDayData] = useState([]);
  const [availMonthData, setMonthData] = useState([]);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const tableRef = useRef(null);
  const divForm = useRef(null);
  const divTable = useRef(null);
  const btnCancel = useRef(null);
  const btnDownload = useRef(null);
  const select1 = useRef(null);
  const select2 = useRef(null);
  const select3 = useRef(null);
  const day = useRef(null);
  function handleYearInputChange(e) {
    console.log(e.target.value);
    setMonthData([]);
    const getAvailableMonthData = async (code, year) => {
      try {
        const data = await getOprAvailableMonths(code, year);
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
    getAvailableMonthData(code, parseFloat(e.target.value)).then(() => {
      select2.current.style.animation = "showSelect 0.5s linear forwards";
    });
  }
  function handleMonthInputChange(e) {
    setAvailableDayData([]);

    const getAvailableDayData = async (code, year, month) => {
      try {
        const data = await getOprAvailableDays(code, year, month);
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
    getAvailableDayData(code, year, parseFloat(e.target.value)).then(() => {
      select3.current.style.animation = "showSelect 0.5s linear forwards";
    });
  }
  function importData() {
    const getData = async (code, year, month, day) => {
      try {
        const data = await getOprData(code, year, month, day);
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
    if (day.current.value !== null) {
      select1.current.style.animation = "hideSelect 0.5s linear forwards";
      select2.current.style.animation = "hideSelect 0.5s linear forwards";
      select3.current.style.animation = "hideSelect 0.5s linear forwards";
      divForm.current.style.animation = "hideDiv 0.5s linear forwards";
      getData(code, year, month, day.current.value).then(() => {
        setText("Confirmar");
        divTable.current.style.animation = "showDiv 1s linear forwards";
        btnCancel.current.style.opacity = "1";
        btnCancel.current.style.pointerEvents = "all";
        btnDownload.current.style.pointerEvents = "all";
        btnDownload.current.style.opacity = "1";
      });
    }
  }
  function cancel() {
    divTable.current.style.animation = "hideDiv 0.5s linear forwards";
    divForm.current.style.animation = "showDiv 1s linear forwards";
    btnCancel.current.style.opacity = "0";
    btnCancel.current.style.pointerEvents = "none";
    btnDownload.current.style.opacity = "0";
    btnDownload.current.style.pointerEvents = "none";
    select2.current.value = "";
    select1.current.value = "";
    select1.current.style.animation = "showSelect 0.5s linear forwards";
    setMonthData([]);
    setAvailableDayData([]);
    day.current.value = "";
    setText("Salvar");
  }
  function convertTableToXLSX() {
    // Get table element using querySelector
    const table = tableRef.current;

    // Convert table to worksheet
    const worksheet = XLSX.utils.table_to_sheet(table);

    // Set border styles for specific cells or range of cells
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert workbook to XLSX file
    const xlsxOutput = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Save the file
    saveXLSXFile(xlsxOutput);
  }

  function saveXLSXFile(data) {
    const blob = new Blob([data], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `DadosOperaçãoJDO/${day.current.value}/${month}/${year}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <div className="container-export">
        j
        <ButtonGoBack />
        <h1>Exportar Dados Operacionais</h1>
        <ExportOptions
          tableMode={false}
          id={["divExport", "select2", "select3", "a", "select1"]}
          handleYearInputChange={handleYearInputChange}
          handleMonthInputChange={handleMonthInputChange}
          monthList={availMonthData}
          daysList={availDayData}
          refList={[day]}
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
            "--start-height": `20vh`,
            "--start-pad": `0 0 .5vh 0`,
          }}
        >
          <TableShow
            headerName={[
              "Sistema [Viagem]",
              "Sistema [Parada]",
              "Tipo de operação - Passageiros [Viagem]",
              "Tipo de operação Passageiros [Parada]",
            ]}
            data={data}
            year={year}
            month={month}
            setRef={tableRef}
          />
        </div>
        <Button id={"btnImport"} func={convertTableToXLSX}>
          <TbDownload />
          Baixar
        </Button>
      </div>
    </>
  );
};

export default ExportOprData;
