import React, { useEffect, useState } from "react";
import Button from "./button";
import "./styles/cabinOrder.css";

const Selected = ({ cabinsList }) => {
  return (
    <>
      {cabinsList.map((cabin) => (
        <li>

          <Button classes={"add-cabin-button"} >
            {cabin}
          </Button>
        </li>
      ))}
    </>
  );
};

export default Selected;