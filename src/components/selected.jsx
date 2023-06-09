import React, { useEffect, useState } from "react";
import Button from "./button";
import { writeCabinsOrder } from "../services/firebase";
import "./styles/cabinOrder.css";

const Selected = ({ code,setCabinsList, cabinsList }) => {
  function removeCabin(e) {
    console.log(e.target.name);
    const newCabinsList = cabinsList.filter((cabin) => cabin != e.target.name);
    setCabinsList(newCabinsList);
    writeCabinsOrder(code, newCabinsList);
  }
  return (
    <>
      {cabinsList.map((cabin) => (
        <li key={`${cabin}selectedBtn`}>
          <Button func={removeCabin} name={cabin} classes={"add-cabin-button"}>
            {cabin}
          </Button>
        </li>
      ))}
    </>
  );
};

export default Selected;
