import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSnow, BsCheckLg } from "react-icons/bs";
import { TbWindow, TbWindowOff } from "react-icons/tb";
import { MdOutlineRestartAlt } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { CgRemove, CgLogOff, CgInfo } from "react-icons/cg";
import { BsFilterSquare } from "react-icons/bs";
import { FaWifi } from "react-icons/fa";
import Button from "./button";
import CabinsManage from "./cabinsManage";
import "./styles/cabinList.css";
import { writeFullCabinsData, getCabinListData } from "../services/firebase";

const CabinList = ({ code, cabinsList, cabinsData, setCabinsData }) => {
  const ac = useRef(false);
  const wifi = useRef(false);
  const window = useRef(false);
  const divCabin = useRef(null);
  const btnFilter = useRef(null);
  const [filteredCabinList, setFilterList] = useState({});
  useEffect(() => {
    console.log(cabinsData)
    setFilterList(cabinsData);
  }, []);
  function openFilterList() {
    btnFilter.current = document.getElementById("filterBtn");
    btnFilter.current.style.width = "0%";
    btnFilter.current.style.opacity = "0";
    btnFilter.current.style.padding = "2vh 0vh";
    btnFilter.current.style.pointerEvents = "none";
  }
  function closeFilterList() {
    btnFilter.current = document.getElementById("filterBtn");
    btnFilter.current.style.width = "100%";
    btnFilter.current.style.opacity = "1";
    btnFilter.current.style.padding = "2vh 1vh";
    btnFilter.current.style.pointerEvents = "";
    setFilterList(cabinsData);
  }
  function changeFilter(e) {
    let type = e.target.name;
    console.log(type);
    if (e.target.classList.length == 0) {
      e.target.classList.add("active");
    } else {
      e.target.classList.remove("active");
    }
    if (type == "ac") {
      if (ac.current == false) {
        ac.current = true;
      } else {
        ac.current = false;
      }
    }
    if (type == "window") {
      if (window.current == false) {
        window.current = true;
      } else {
        window.current = false;
      }
    }
    if (type == "wifi") {
      if (wifi.current == false) {
        wifi.current = true;
      } else {
        wifi.current = false;
      }
    }
  }
  function filter() {
    const filteredCabinData = { ...cabinsData };
    Object.keys(filteredCabinData).forEach((key) => {
      const data = filteredCabinData[key];
      if (
        data.ac.value != ac.current ||
        data.window.value != window.current ||
        data.wifi.value != wifi.current
      ) {
        delete filteredCabinData[key];
      } else {
      }
    });
    console.log(Object.keys(filteredCabinData).length);
    setFilterList(filteredCabinData);
  }
  function activeAll(e) {
    console.log(code);
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.dataset.info);
    let stringValue = e.target.dataset.info;
    let value = stringValue === "true";
    if (cabinsData != null) {
      const newCabinsData = { ...cabinsData };
      Object.keys(newCabinsData).forEach((cabin) => {
        if (newCabinsData[cabin]) {
          if (newCabinsData[cabin][e.target.name]) {
            newCabinsData[cabin][e.target.name].value = value;
          } else {
            newCabinsData[cabin][e.target.name] = {
              value: value,
            };
          }
        } else {
          newCabinsData[cabin] = {
            [e.target.name]: { value: value },
          };
        }
      });
      console.log(newCabinsData);
      setCabinsData(newCabinsData);
      writeFullCabinsData(code, newCabinsData);
    } else {
      const newCabinsData = {};
      cabinsList.forEach((cabin) => {
        if (newCabinsData[cabin]) {
          if (newCabinsData[cabin][e.target.name]) {
            newCabinsData[cabin][e.target.name].value = value;
          } else {
            newCabinsData[cabin][e.target.name] = {
              value: value,
            };
          }
        } else {
          newCabinsData[cabin] = {
            [e.target.name]: { value: value },
          };
        }
      });
      setCabinsData(newCabinsData);
      writeFullCabinsData(code, newCabinsData);
    }
  }
  function sincronize() {
    let sincronizeBtn = document.getElementById("sincronizeBtn");
    divCabin.current = document.getElementById("cabinListDiv");
    sincronizeBtn.children[0].style.animation = "spin 1s infinite linear";
    divCabin.current.style.pointerEvents = "none";
    divCabin.current.style.filter = "brightness(0.5)";

    const getCabinsData = async () => {
      try {
        const data = await getCabinListData(code);
        console.log(data);
        setCabinsData(data);
      } catch (error) {
        console.error(error);
      } finally {
        //retirar o login
        sincronizeBtn.children[0].style.animation = "";
        divCabin.current.style.pointerEvents = "";
        divCabin.current.style.filter = "brightness(1)";
      }
    };
    getCabinsData();
  }
  return (
    <>
      <div className="container-list">
        <h1>Lista de cabines</h1>
        <div>
          <Button id="sincronizeBtn" func={sincronize}>
            <MdOutlineRestartAlt></MdOutlineRestartAlt>
          </Button>
          <ul>
            <li>
              <h2>Atalhos rápidos</h2>
            </li>
            <li>
              <Button dataInfo={true} func={activeAll} name={"ac"}>
                <CgRemove />
              </Button>
              <Button dataInfo={false} func={activeAll} name={"ac"}>
                <CgLogOff />
              </Button>
              <Button>
                <BsSnow />
              </Button>
            </li>
            <li>
              <Button dataInfo={true} func={activeAll} name={"window"}>
                <CgRemove />
              </Button>
              <Button dataInfo={false} func={activeAll} name={"window"}>
                <CgLogOff />
              </Button>
              <Button>
                <TbWindow />
              </Button>
            </li>
            <li>
              <Button dataInfo={true} func={activeAll} name={"wifi"}>
                <CgRemove />
              </Button>
              <Button dataInfo={false} func={activeAll} name={"wifi"}>
                <CgLogOff />
              </Button>
              <Button>
                <FaWifi />
              </Button>
            </li>
          </ul>
          <div className="filter-div">
            <Button id={"filterBtn"} func={openFilterList}>
              <BsFilterSquare />
              Filtrar
            </Button>
            <ul>
              <li>
                <Button func={closeFilterList} name={"btnClose"}>
                  <RxCross2 className="close-btn" />
                </Button>
              </li>
              <li>
                <Button func={changeFilter} name={"ac"}>
                  <BsSnow className="ac" />
                </Button>
              </li>
              <li>
                <Button func={changeFilter} name={"window"}>
                  <TbWindow className="window" />
                </Button>
              </li>
              <li>
                <Button func={changeFilter} name={"wifi"}>
                  <FaWifi className="wifi" />
                </Button>
              </li>
              <li>
                <Button func={filter} name={"apply"}>
                  <BsCheckLg className="apply-filter-btn" />
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div id="cabinListDiv">
          <CabinsManage
            setCabinsData={setCabinsData}
            code={code}
            cabinsData={filteredCabinList}
            cabinsList={cabinsList}
          />
        </div>
      </div>
    </>
  );
};

export default CabinList;
