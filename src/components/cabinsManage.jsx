import React, { useEffect, useState } from "react";
import Button from "./button";
import { MdOutlineWindow } from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { TbWindow, TbWindowOff } from "react-icons/tb";
import { FaWifi } from "react-icons/fa";
import { writeCabinsData } from "../services/firebase";
import "./styles/cabinOrder.css";

const CabinsManage = ({ code, cabinsList, cabinsData, setCabinsData }) => {
  useEffect(() => {
    console.log(cabinsData);
  }, []);
  function active(e) {
    const { name } = e.target;
    const className = e.target.children[0].classList.value;
    const currentValue = e.target.classList.contains("active");
    const value = !currentValue;

    const newCabinsData = {
      ...cabinsData,
      [name]: {
        ...cabinsData[name],
        [className]: { value: value },
      },
    };

    setCabinsData(newCabinsData);

    if (currentValue) {
      e.target.classList.remove("active");
    } else {
      e.target.classList.add("active");
    }

    writeCabinsData(code, name, className, value);
  }
  return (
    <>
      {cabinsList.map((cabin) =>
        cabinsData[cabin] ? (
          <div key={cabin + "div"}>
            <div>
              <MdOutlineWindow />
            </div>
            <div>
              <h3>{`Cabine ${cabin}`}</h3>
              {cabinsData && cabinsData[cabin] ? (
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
                  <Button name={cabin} func={active}>
                    <BsSnow className="ac" />
                  </Button>
                  <Button name={cabin} func={active}>
                    <TbWindow className="window" />
                  </Button>
                  <Button name={cabin} func={active}>
                    <FaWifi className="wifi" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <></>
        )
      )}
    </>
  );
};

export default CabinsManage;
