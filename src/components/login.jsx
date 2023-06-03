import React, { useState, useEffect, useRef, useContext } from "react";
import { useCookies } from "react-cookie";
import Button from "./button";
import LinkButton from "./linkButton";
import { useNavigate } from "react-router-dom";
import "./styles/login.css"
const Login = ({}) => {
  const navigate = useNavigate();
  const [userInputData, setInputdata] = useState("");
  const passInputData = useRef("");

  function handleInputChange(e) {
    let data = e.target.value;
    setInputdata(data);
  }

  function goToSpark() {
    navigate(`/Spark`);
  }
  return (
    <>
        <div className="container-login">
        <h1>Pagina de login</h1>
          <input
            type="password"
            name="senha"
            placeholder="Coloque sua senha"
            className="container-login-input"
            ref={passInputData}
          ></input>
          <Button classes={"login-button"} func={goToSpark}>Entrar</Button>
          <LinkButton>Não tem uma conta? clique aqui!</LinkButton>
        </div>
    </>
  );
};

export default Login;
