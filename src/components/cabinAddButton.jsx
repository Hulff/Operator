import React, { useEffect, useState } from "react";
import Button from "./button";
import "./styles/cabinOrder.css";
import { writeCabinsOrder } from "../services/firebase";

const CabinAddButton = ({
  code,
  setCabinsData,
  cabinsData,
  data,
  setCabinsList,
  cabinsList,
}) => {
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
    let newCabinsData = { ...cabinsData };
    if (cabinsList.length == data.cabinNumber) {
      return;
    }
    for (let i = 0; i < cabinsList.length; i++) {
      if (cabinsList[i] == n) {
        return;
      }
    }
    if (cabinsData) {
      if (!cabinsData[n]) {
        newCabinsData = {
          ...newCabinsData,
          [n]: {
            ac: { value: false },
            window: { value: false },
            wifi: { value: false },
          },
        };
      }
    }
    const newCabinsList = [...cabinsList, n];
    console.log(newCabinsList);
    writeCabinsOrder(code, newCabinsList);
    setCabinsData(newCabinsData);
    setCabinsList(newCabinsList);
  }

  return (
    <>
      {cabinBtnList.map((cabin) => (
        <li key={`${cabin}addBtn`}>
          <Button classes={"add-cabin-button"} func={() => addCabin(cabin)}>
            {cabin}
          </Button>
        </li>
      ))}
    </>
  );
};

export default CabinAddButton;
