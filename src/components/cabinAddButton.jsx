import React, { useEffect, useState } from "react";
import Button from "./button";
import "./styles/cabinOrder.css";
import { set } from "firebase/database";
import CabinList from "./cabinList";
import { writeCabinsOrder } from "../services/firebase";

const CabinAddButton = ({ code,data, setCabinsList, cabinsList }) => {
  const [cabinBtnList, setCabinsBtnList] = useState([]);
  useEffect(() => {
    console.log(data);
    let newCabinBtnList = [];
    for (let i = 0; i < data.cabinNumber; i++) {
      newCabinBtnList.push(i + 1);
    }
    setCabinsBtnList(newCabinBtnList);
  }, []);

  function addCabin(n) {
    if(cabinsList.length == data.cabinNumber) {
        return
    }
    for(let i=0;i<cabinsList.length;i++) {
        if(cabinsList[i] == n) {
            return
        }
    }
    const newCabinsList = [...cabinsList, n];
    console.log(newCabinsList);
    writeCabinsOrder(code,newCabinsList)
    setCabinsList(newCabinsList);
  }

  return (
    <>
      {cabinBtnList.map((cabin) => (
        <li>
          <Button classes={"add-cabin-button"} func={() => addCabin(cabin)}>
            {cabin}
          </Button>
        </li>
      ))}
    </>
  );
};

export default CabinAddButton;
