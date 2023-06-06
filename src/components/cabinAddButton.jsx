import React, { useEffect, useState } from "react";
import Button from "./button";
import "./styles/cabinOrder.css";
import { set } from "firebase/database";
import CabinList from "./cabinList";

const CabinAddButton = ({ data, setCabinsList, cabinsList }) => {
  const [cabinBtnList, setCabinsBtnList] = useState([]);
  useEffect(() => {
    console.log(data);
    let newCabinBtnList = [];
    for (let i = 0; i < 26; i++) {
      newCabinBtnList.push(i + 1);
    }
    setCabinsBtnList(newCabinBtnList);
  }, []);

  function addCabin(n) {
    if(cabinsList.length == 26) {
        return
    }
    for(let i=0;i<cabinsList.length;i++) {
        if(cabinsList[i] == n) {
            return
        }
    }
    const newCabinsList = [...cabinsList, n];
    console.log(newCabinsList);
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
