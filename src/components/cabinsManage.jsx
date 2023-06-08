import React, { useEffect, useState } from "react";
import Button from "./button";
import { MdOutlineWindow } from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { TbWindow, TbWindowOff } from "react-icons/tb";
import { FaWifi } from "react-icons/fa";
import { writeCabinsData } from "../services/firebase";
import "./styles/cabinOrder.css";

const CabinsManage = ({ code, cabinsList, cabinsData }) => {
  useEffect(() => {
    console.log(cabinsData);
  }, []);
  function active(e) {
    console.log(code);
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.children[0].classList.value);
    if (e.target.classList.value == "" || null || undefined) {
      writeCabinsData(
        code,
        e.target.name,
        e.target.children[0].classList.value,
        true
      );
      e.target.classList.add("active");
    } else {
      e.target.classList.remove("active");
      writeCabinsData(
        code,
        e.target.name,
        e.target.children[0].classList.value,
        false
      );
    }
  }
  return (
    <>
      {cabinsList.map((cabin) => (
        <div key={cabin + "div"}>
          <div>
            <MdOutlineWindow />
          </div>
          <div>
            <h3>{`Cabine ${cabin}`}</h3>
            {cabinsData[cabin] ? (
              <>
                <Button
                  classes={
                    cabinsData[cabin].ac
                      ? cabinsData[cabin].ac.value
                        ? "active"
                        : ""
                      : ""
                  }
                  name={cabin}
                  func={active}
                >
                  <BsSnow className="ac" />
                </Button>
                <Button
                  classes={
                    cabinsData[cabin].window
                      ? cabinsData[cabin].window.value
                        ? "active"
                        : ""
                      : ""
                  }
                  name={cabin}
                  func={active}
                >
                  <TbWindow className="window" />
                </Button>
                <Button
                  classes={
                    cabinsData[cabin].wifi
                      ? cabinsData[cabin].wifi.value
                        ? "active"
                        : ""
                      : ""
                  }
                  name={cabin}
                  func={active}
                >
                  <FaWifi className="wifi" />
                </Button>
              </>
            ) : (
              <>
              <Button
                name={cabin}
                func={active}
              >
                <BsSnow className="ac" />
              </Button>
              <Button
                name={cabin}
                func={active}
              >
                <TbWindow className="window" />
              </Button>
              <Button
                name={cabin}
                func={active}
              >
                <FaWifi className="wifi" />
              </Button>
            </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default CabinsManage;
